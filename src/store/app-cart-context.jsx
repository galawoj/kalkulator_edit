import {createContext} from 'react'

export const CartContext = createContext({
    onSetSendEmailInfo: ()=>{},	
    onSetLoginSucces: ()=>{},		
    onSetRegistrationSucces: ()=>{},		
    setIsLoggedIn: ()=>{},		
    setButtonClicked: ()=>{},		
    setHide: ()=>{},	
    setBeamClicked: ()=>{},		
    onLoginHandler:()=>{},			
    onRegisterHandler:()=>{},	
    onBeamDesignHandler:()=>{},	

    sendEmailInfo: {},		
    loginSucces:{},	
    registrationSucces:{},		
    userDocumentName:{},		
    subscriptions:{},		
    buttonClicked:{},		
    sessionTime:{},		
    subscriptionsTime:{},		
    isLoggedIn:{}	
    
});
