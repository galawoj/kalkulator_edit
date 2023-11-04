import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';

import styles from './IntroButtons.module.css'

const Button = (props) => {




    const inactiveHandler = async () => {



        // Create an initial document to update.
        const docRef = doc(db, "users", `${props.userDocumentName}`);
        await updateDoc(docRef, {

            [`subscriptions.${props.subName}`]: serverTimestamp()
        });


    }

    return (
        <button
            onClick={props.isActive ? props.onClick : inactiveHandler}
            className={`${styles.button} ${!props.isActive && styles.inactive} ${props.buttonClicked && styles.hidden}`}
        >
            <div>
                {props.children}
                {!props.isActive && <div style={{ "color": "red" }}>Buy 30-day subscription</div>}
            </div>
        </button>
    )
}

export default Button