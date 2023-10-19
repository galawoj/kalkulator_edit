import React, { useState } from 'react';
import Registration from './Registration';
import SignIn from './SignIn';


const Login = (props) => {
    const [switchForm, setSwitchForm] = useState(false)

    const switchHandler = () => {
        switchForm ? setSwitchForm(false) : setSwitchForm(true)
        props.onSetLoginSucces(false)
        props.onSetRegistrationSucces(false)

    }

    return (
        <>
            {!switchForm ? <SignIn onSwitchHandler={switchHandler} {...props} /> : <Registration onSwitchHandler={switchHandler} {...props} />}

        </>

    )


}

export default Login
