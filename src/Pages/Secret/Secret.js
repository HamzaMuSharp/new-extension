import React from 'react'
import styles from './Secret.module.css'


const Secret = (props) => {

    const { newdecryptedkey, generateKey, decryptedkey, password } = props
    const handleLogout = () => {
        newdecryptedkey("")
    }

    const resetHandler = () => {
        window.chrome.storage.sync.remove(["mySecretKey"], function () {
            handleLogout()
        });
    }

    const regenerateKeyHandler = () => {
        generateKey("", password)
    }

    return (
        <div className={styles.key_container}>
            <h5>Your Secret Key:</h5>
            <p>{decryptedkey}</p>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={regenerateKeyHandler}>Regenerate key</button>
            <button onClick={resetHandler}>Reset</button>
        </div>
    )
}

export default Secret