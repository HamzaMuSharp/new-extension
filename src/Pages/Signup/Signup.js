import React, { useState } from 'react';
import styles from './Signup.module.css'


function Signup(props) {

    const { generateKey } = props
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError(true)
            return
        }
        generateKey(e)

    }

    return (
        <div className={styles.signupFormcontainer}>
            <h3>Please input the password fields to generate secret key</h3>

            <form onSubmit={handleSubmit}>
                <label for='password' >Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <label for='confirmPassword' >Confirm Password</label>
                <input id='confirmPassword' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <br />
                {error && <p>Passwords donot match</p>}
                <button type="submit">Initialize Extension</button>
            </form>
        </div>
    );
}

export default Signup;
