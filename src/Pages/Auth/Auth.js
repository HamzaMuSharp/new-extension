import React, { useState } from 'react'
import Secret from '../Secret/Secret'
import Signin from '../Signin/Signin'
import Signup from '../Signup/Signup'
import { useEffect } from 'react'
import CryptoJS from 'crypto-js'
import { generateSecret } from '../../utils/generateSecret'

const Auth = () => {

    const [decrypkey, setdecryptkey] = useState(false)
    const [isEncrypted, setIsEncrypted] = useState(false)
    const [password, setPassword] = useState("")


    const generateKey = (e, pass) => {
        if (e) {
            e.preventDefault()
        }
        const secretkey = generateSecret()
        const encryptedText = CryptoJS.AES.encrypt(secretkey, pass).toString()
        const decryptedText = CryptoJS.AES.decrypt(encryptedText, pass).toString(CryptoJS.enc.Utf8);
        setdecryptkey(decryptedText)
        window.chrome.storage.sync.set({ "mySecretKey": encryptedText })
        setPassword(pass)
    }


    useEffect(() => {

        window.chrome.storage.sync.get("mySecretKey", (res) => {
            if (res.mySecretKey) {
                setIsEncrypted(true)
            }
            else {
                setIsEncrypted(false)
            }
        })
    }, [decrypkey])


    return (
        <>

            {decrypkey ? <Secret decryptedkey={decrypkey} newdecryptedkey={setdecryptkey} generateKey={generateKey} password={password} /> :
                isEncrypted ? <Signin decryptedkey={setdecryptkey} setPassword={setPassword} /> :
                    <Signup generateKey={generateKey} />}
        </>
    )
}
export default Auth
