import React from 'react'
import { useState } from 'react'
import CryptoJS from 'crypto-js'
import styles from './Signin.module.css'

const Signin = (props) => {

    const { decryptedkey } = props
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()

        window.chrome.storage.sync.get("mySecretKey", (result) => {
            const encryptedSecretKey = result.mySecretKey;
            const decryptedSecretKey = CryptoJS.AES.decrypt(encryptedSecretKey, password).toString(CryptoJS.enc.Utf8);
            props.setPassword(password)

            if (decryptedSecretKey) {
                decryptedkey(decryptedSecretKey)
            }
            else {
                alert("Incorrect Password")
            }

        });

    }
    return (
        <div className={styles.signinFormcontainer}>

            <form onSubmit={handleSubmit}>
                <label for='password' >Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Signin</button>
            </form>
        </div>
    )
}

export default Signin