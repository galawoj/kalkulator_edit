

import SubButton from "./SubButton"
import styles from "./Navigation.module.css"



const SubInfo = (props) => {

    const startSubscriptionDate = props.userSubscriptions[props.subName].toDate().getTime()

    const miliseconsPerDay = 24 * 3600 * 1000 //ms

    const miliseconsPerHour = 3600 * 1000 //ms

    const timeOfSubscription = 0.5 * miliseconsPerDay //ms

    const endSubscriptionDate = startSubscriptionDate + timeOfSubscription

    const subscriptionLeftDays = props.loginTime ? Math.round((endSubscriptionDate - props.loginTime.toDate().getTime())/miliseconsPerDay) : 0

    const subscriptionLeftHours = props.loginTime ? Math.round((endSubscriptionDate - props.loginTime.toDate().getTime())/miliseconsPerHour) : 0



    return (
        <div className={styles.subInfo}>
            <h4>{props.children}</h4>
            <div>Left: <b style={{'color':"red"}}>{subscriptionLeftDays<=1 ? subscriptionLeftHours : subscriptionLeftDays} {subscriptionLeftDays<=1?'hours':'days'}</b></div>
            
            <SubButton {...props}>Delete</SubButton>

        </div>
    )
}

export default SubInfo