import React from 'react'
import styles from './SecretManager.module.css'


const SecretManager = (props) => {

    const { resetSecretKey, generateKey, decryptkey } = props
    const handleLogout = () => {
        resetSecretKey()
    }

    const regenerateKeyHandler = (e) => {
        generateKey(e)
    }

    return (
        <div className={styles.key_container}>
            <h5>Your Secret Key:</h5>
            <p>{decryptkey}</p>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={regenerateKeyHandler}>Regenerate key</button>
        </div>
    )
}

export default SecretManager
