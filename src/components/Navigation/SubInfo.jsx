import React, {useEffect} from 'react'

import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase';

import UnsubButton from "./UnsubButton"
import styles from "./Navigation.module.css"



const SubInfo = (props) => {
    

    const startSubscriptionDate = props.userSubscriptions[props.subName].toDate().getTime()

    const milisecondsPerDay = 24 * 3600 * 1000 //ms

    const milisecondsPerHour = 3600 * 1000 //ms

    const daysOfSubscription = props.userSubscriptionsTime[props.subName]*milisecondsPerDay //ms

    const endSubscriptionDate = startSubscriptionDate + daysOfSubscription

    const subscriptionLeftDays = props.sessionTime ? Math.round((endSubscriptionDate - props.sessionTime)/milisecondsPerDay) : 0

    const subscriptionLeftHours = props.sessionTime ? Math.round((endSubscriptionDate - props.sessionTime)/milisecondsPerHour) : 0

useEffect(()=>{


const timeSession = props.sessionTime ? props.sessionTime:0
if(timeSession>=endSubscriptionDate){
    updateDoc(doc(db, "users", `${props.userDocumentName}/subscriptionsCollection/subscriptions`), {
        [`${props.subName}`]: null
})
}

},[props.sessionTime])
    

    return (
        <div className={styles.subInfo}>
            <h4>{props.children}</h4>
            <div>Left: <b style={{'color':"red"}}>{subscriptionLeftDays<=1 ? subscriptionLeftHours : subscriptionLeftDays} {subscriptionLeftDays<=1?'hours':'days'}</b></div>
            
            <UnsubButton {...props}>Delete</UnsubButton>

        </div>
    )
}

export default SubInfo