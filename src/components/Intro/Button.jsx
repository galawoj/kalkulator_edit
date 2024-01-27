import { useContext } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';

import styles from './IntroButtons.module.css'

import { CartContext } from "../../store/app-cart-context";

const Button = (props) => {
   
    const {userDocumentName,buttonClicked} = useContext(CartContext)

    const inactiveHandler = async () => {

        // Create an initial document to update.
        const docRef = doc(db, "users", `${userDocumentName}/subscriptionsCollection/subscriptions`);
        await updateDoc(docRef, {

            [`${props.subName}`]: serverTimestamp()
        });


    }

    return (
        <button
            onClick={props.isActive ? props.onClick : inactiveHandler}
            className={`${styles.button} ${!props.isActive && styles.inactive} ${buttonClicked && styles.hidden}`}
        >
            <div>
                {props.children}
                {!props.isActive && <div style={{ "color": "red" }}>Buy 30-day subscription</div>}
            </div>
        </button>
    )
}

export default Button