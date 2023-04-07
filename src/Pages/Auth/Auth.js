import React, { useState, useEffect } from 'react';
import SecretManager from '../Secret Manager/SecretManager';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';

const Auth = () => {
    const [decryptkey, setdecryptkey] = useState(false);
    const [isInitialised, setisInitialised] = useState(false);
    const [keyPassword, setKeyPassword] = useState("");


    const generateKey = (e, password = keyPassword) => {
        e.preventDefault();
        window.chrome.runtime.sendMessage({ action: 'generateKey', password: password }, (decryptedText) => {
            setdecryptkey(decryptedText);
        });
        setKeyPassword(password)
    };

    //    const resetDecryptKey = useCallback(() => setdecryptkey(''), [setdecryptkey]);
    const resetDecryptKey = () => setdecryptkey('');

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
                    setisInitialised={setisInitialised}
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







/////////////////////////////Notes///////////////////////////////////
//It means that if we donot give 2nd argument whereever we call generateKey(), set its 2nd argument to keyPassword.