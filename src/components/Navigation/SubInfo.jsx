

import SubButton from "./SubButton"
import styles from "./Navigation.module.css"



const SubInfo = (props) => {

    const startSubscriptionDate = props.userSubscriptions[props.subName].toDate().getTime()

    const miliseconsPerDay = 24 * 3600 * 1000 //ms

    const timeOfSubscription = 30 * miliseconsPerDay //ms

    const endSubscriptionDate = new Date(startSubscriptionDate + timeOfSubscription)

    console.log(endSubscriptionDate)




    //.toJSON().slice(0, 10)


    return (
        <div className={styles.subInfo}>
            <h5>{props.children}</h5>
            <div>end of sub:</div>
            <div>{endSubscriptionDate.toJSON().slice(0, 10)}</div>
            <SubButton {...props}>Delete</SubButton>

        </div>
    )
}

export default SubInfo