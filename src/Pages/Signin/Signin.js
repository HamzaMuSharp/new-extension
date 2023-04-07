import React from 'react'
import { useState } from 'react'
import styles from './Signin.module.css'

const Signin = (props) => {

    const { decryptkey, resetDecryptKey, setisInitialised, setKeyPassword } = props
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()

        window.chrome.runtime.sendMessage({ action: 'getState' }, (res) => {
            const encryptedSecretKey = res[password];
            if (!encryptedSecretKey) {
                setError(true)
                return
            }
            window.chrome.runtime.sendMessage({ action: 'decrypt', key: encryptedSecretKey }, (decKey) => {
                decryptkey(decKey)
            })
        });
        setKeyPassword(password)
    }

    const resetHandler = () => {
        window.chrome.runtime.sendMessage({ action: 'reset' }, (resp) => {
            resetDecryptKey()
            setisInitialised(false)
        });
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