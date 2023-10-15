import React, { useState, useEffect } from 'react';
import styles from "./Login.module.css"



const Registration = (props) => {


    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {

        const identifier = setTimeout(() => {
           
            setFormIsValid(
                enteredEmail.includes('@') && enteredPassword.trim().length > 6
            );
        }, 500);

        return () => {
            clearTimeout(identifier)
        }
    }, [enteredPassword, enteredEmail])


    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);


    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);

    };

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onRegister(enteredEmail, enteredPassword);
    };

    return (
        <>
            <form onSubmit={submitHandler} className={styles.login}>
            {props.registrationSuccesion&& <h4 className={styles.errorMessage}>Registration failed!</h4>}
                <div
                    className={`${styles.control} ${emailIsValid === false ? styles.invalid : ''
                        }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                    placeholder='enter your email'
                        type="email"
                        id="email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${styles.control} ${passwordIsValid === false ? styles.invalid : ''
                        }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                    placeholder='enter your password (min. 7 characters)'
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={styles.actions}>
                    <button type="submit" disabled={!formIsValid}>
                        Register
                    </button>
                    <button className={styles.typeFormButton}  onClick={props.onSwitchHandler}>
                        Sign in
                    </button>
                </div>
            </form>
        </>
    );
}

export default Registration
