import React, { useContext, useState } from 'react';
import Registration from './Registration';
import SignIn from './SignIn';
import { CartContext } from '../../store/app-cart-context';

const Login = () => {
    const [switchForm, setSwitchForm] = useState(false)
    const { onSetLoginSucces, onSetRegistrationSucces, onSetSendEmailInfo,isLoggedIn } = useContext(CartContext)

    const switchHandler = () => {
        switchForm ? setSwitchForm(false) : setSwitchForm(true)
        onSetLoginSucces(false)
        onSetRegistrationSucces(false)
        onSetSendEmailInfo(false)

    }

    return (
        <>
            {!isLoggedIn && (!switchForm ? <SignIn onSwitchHandler={switchHandler} /> : <Registration onSwitchHandler={switchHandler} />)}

        </>
    )
}

export default Login
