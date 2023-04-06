import React, { useState, useEffect, useCallback } from 'react';
import SecretManager from '../Secret Manager/SecretManager';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import CryptoJS from 'crypto-js';
import { generateSecret } from '../../utils/generateSecret';
import { staticKey } from '../../utils/constants';
import { getChromeStorage, setChromeState } from '../../utils/storage';

const Auth = () => {
    const [decryptkey, setdecryptkey] = useState(false);
    const [isInitialised, setisInitialised] = useState(false);
    const [keyPassword, setKeyPassword] = useState("");


    const generateKey = (e, password = keyPassword) => {
        if (e) {
            e.preventDefault();
        }
        const secretkey = generateSecret();
        const encryptedText = CryptoJS.AES.encrypt(secretkey, staticKey).toString();
        const decryptedText = CryptoJS.AES.decrypt(
            encryptedText,
            staticKey
        ).toString(CryptoJS.enc.Utf8);
        setdecryptkey(decryptedText);
        setKeyPassword(password)
        setChromeState(password, encryptedText);
    };

    const resetSecretKey = useCallback(() => setdecryptkey(''), [setdecryptkey]);

    useEffect(() => {

        if (!decryptkey) {
            getChromeStorage().then((res) => {
                if (res && Object.keys(res).length > 0) {
                    setisInitialised(true);
                } else {
                    setisInitialised(false);
                }
            })
        }

    }, [decryptkey]);

    return (
        <>
            {decryptkey ? (
                <SecretManager
                    decryptkey={decryptkey}
                    resetSecretKey={resetSecretKey}
                    generateKey={generateKey}
                />
            ) : isInitialised ? (
                <Signin
                    setKeyPassword={setKeyPassword}
                    setisInitialised={setisInitialised}
                    decryptkey={setdecryptkey}
                    resetSecretKey={resetSecretKey}
                />
            ) : (
                <Signup generateKey={generateKey} />
            )}
        </>
    );
};
export default Auth;
