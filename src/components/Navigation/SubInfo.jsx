import React, {useContext, useEffect} from 'react'
import { CartContext } from '../../store/app-cart-context';

import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase';

import UnsubButton from "./UnsubButton"
import styles from "./Navigation.module.css"




const SubInfo = (props) => {
    const {
        subscriptions,
        subscriptionsTime,
        sessionTime,
        userDocumentName
    } =useContext(CartContext)

    const startSubscriptionDate = subscriptions[props.subName].toDate().getTime()

    const milisecondsPerDay = 24 * 3600 * 1000 //ms

    const milisecondsPerHour = 3600 * 1000 //ms

    const daysOfSubscription = subscriptionsTime[props.subName]*milisecondsPerDay //ms

    const endSubscriptionDate = startSubscriptionDate + daysOfSubscription

    const subscriptionLeftDays = sessionTime ? Math.round((endSubscriptionDate - sessionTime)/milisecondsPerDay) : 0

    const subscriptionLeftHours = sessionTime ? Math.round((endSubscriptionDate - sessionTime)/milisecondsPerHour) : 0

useEffect(()=>{


const timeSession = sessionTime ? sessionTime:0
if(timeSession>=endSubscriptionDate){
    updateDoc(doc(db, "users", `${userDocumentName}/subscriptionsCollection/subscriptions`), {
        [`${props.subName}`]: null
})
}

},[sessionTime])
    

    return (
        <div className={styles.subInfo}>
            <h4>{props.children}</h4>
            <div>Left: <b style={{'color':"red"}}>{subscriptionLeftDays<=1 ? subscriptionLeftHours : subscriptionLeftDays} {subscriptionLeftDays<=1?'hours':'days'}</b></div>
            
            <UnsubButton {...props}>Delete</UnsubButton>

        </div>
    )
}

export default SubInfo