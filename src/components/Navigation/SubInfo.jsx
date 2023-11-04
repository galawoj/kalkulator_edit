import React, {useEffect} from 'react'

import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase';

import SubButton from "./SubButton"
import styles from "./Navigation.module.css"



const SubInfo = (props) => {

    const startSubscriptionDate = props.userSubscriptions[props.subName].toDate().getTime()

    const milisecondsPerDay = 24 * 3600 * 1000 //ms

    const milisecondsPerHour = 3600 * 1000 //ms

    const daysOfSubscription = 30 * milisecondsPerDay //ms

    const endSubscriptionDate = startSubscriptionDate + daysOfSubscription

    const subscriptionLeftDays = props.loginTime ? Math.round((endSubscriptionDate - props.loginTime.toDate().getTime())/milisecondsPerDay) : 0

    const subscriptionLeftHours = props.loginTime ? Math.round((endSubscriptionDate - props.loginTime.toDate().getTime())/milisecondsPerHour) : 0

useEffect(()=>{


const timeSession = props.loginTime? props.loginTime.toDate().getTime() :0
if(timeSession>=endSubscriptionDate){
    const update = updateDoc(doc(db, "users", props.userDocumentName), {
        [`subscriptions.${props.subName}`]: null
})
}

},[props.loginTime])
    

    return (
        <div className={styles.subInfo}>
            <h4>{props.children}</h4>
            <div>Left: <b style={{'color':"red"}}>{subscriptionLeftDays<=1 ? subscriptionLeftHours : subscriptionLeftDays} {subscriptionLeftDays<=1?'hours':'days'}</b></div>
            
            <SubButton {...props}>Delete</SubButton>

        </div>
    )
}

export default SubInfo