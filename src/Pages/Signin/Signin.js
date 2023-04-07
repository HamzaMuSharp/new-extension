import React from 'react'
import { useState } from 'react'
import CryptoJS from 'crypto-js'
import styles from './Signin.module.css'
import { getChromeState, removeChromeState } from '../../utils/storage'
import { staticKey } from '../../utils/constants'

const Signin = (props) => {

    const { decryptkey, resetSecretKey, setisInitialised, setKeyPassword } = props
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        getChromeState().then((result) => {
            const encryptedSecretKey = result[password];
            if (!encryptedSecretKey) {
                setError(true)
                return
            }
            const decryptedSecretKey = CryptoJS.AES.decrypt(encryptedSecretKey, staticKey).toString(CryptoJS.enc.Utf8);
            decryptkey(decryptedSecretKey)
        })
        setKeyPassword(password)
    }

    const resetHandler = () => {
        removeChromeState((items) => {
            resetSecretKey()
            setisInitialised(false)
        })
    }
    return (
        <div className={styles.signinFormcontainer}>

            <form onSubmit={handleSubmit}>
                <label for='password' >Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p>Incorrect Password</p>}
                <br />
                <button type="submit">Signin</button>
            </form>
            <button onClick={resetHandler}>Reset</button>
        </div>
    )
}

export default Signin