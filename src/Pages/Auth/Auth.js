import React, { useState, useEffect, useCallback } from 'react';
import SecretManager from '../Secret Manager/SecretManager';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import { useDispatch } from 'react-redux'
import { setKey } from "../../store/keySlice"

const Auth = (props) => {
    const [decryptkey, setdecryptkey] = useState(false);
    const [isInitialised, setisInitialised] = useState(false);
    const [keyPassword, setKeyPassword] = useState("");
    const dispatch = useDispatch()
    const generateKey = (e, password = keyPassword) => {
        e.preventDefault();
        window.chrome.runtime.sendMessage({ action: 'generateKey', password: password }, (cipherTexts) => {
            setdecryptkey(cipherTexts.decryptedText);
        });
        setKeyPassword(password)
    };

    const resetDecryptKey = useCallback(() => {
        setdecryptkey('')
        setisInitialised(false);
    }, [])

    useEffect(() => {
        if (!decryptkey) {
            window.chrome.runtime.sendMessage({ action: 'getState' }, (res => {
                if (res && Object.keys(res).length > 0) {
                    setisInitialised(true);
                } else {
                    setisInitialised(false);
                }
            }))
        }

    }, [decryptkey]);

    useEffect(() => {
        window.chrome.storage.onChanged.addListener((state) => {
            const value = Object.values(state)?.[0]?.newValue
            if (value) {
                const key = Object.keys(state)[0]
                dispatch(setKey({ [key]: value }))
            }
            else {
                dispatch(setKey({}))
            }
        })
    }, [])

    return (
        <>
            {decryptkey ? (
                <SecretManager
                    decryptkey={decryptkey}
                    resetDecryptKey={resetDecryptKey}
                    generateKey={generateKey}
                />
            ) : isInitialised ? (
                <Signin
                    setKeyPassword={setKeyPassword}
                    decryptkey={setdecryptkey}
                    resetDecryptKey={resetDecryptKey}
                />
            ) : (
                <Signup generateKey={generateKey} />
            )}
        </>
    );
};

export default Auth;
