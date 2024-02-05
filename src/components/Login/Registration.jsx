import React, { useState, useContext } from 'react';


import { CartContext } from '../../store/app-cart-context';
import RegistrationForm from './RegistrationForm';
import SendEmailAlert from './SendEmailAlert';
import Loader from '../../common/Loader';


const Registration = (props) => {

    const [enteredEmail, setEnteredEmail] = useState('');

const {sendEmailInfo,waitingForRegistration} = useContext(CartContext)
 
    return (
        <>
        {waitingForRegistration&&<Loader/>}
        
        {!sendEmailInfo && !waitingForRegistration && <RegistrationForm onSetEnteredEmail={setEnteredEmail} enteredEmail={enteredEmail} {...props}/>}
        
        {sendEmailInfo && <SendEmailAlert enteredEmail={enteredEmail} {...props}/>}  
        </>
    );
}

export default Registration
