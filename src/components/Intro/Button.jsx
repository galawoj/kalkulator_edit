import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase';

import styles from './IntroButtons.module.css'

const Button = (props) =>{




const inactiveHandler = async() =>{

        // Create an initial document to update.
        const docRef =  doc(db, "users", `${props.userDocumentName}`);
    
        await updateDoc(docRef, {
            [`subscriptions.${props.subName}`]: true
        });
    

}

    return(
        <button 
        onClick={props.isActive?props.onClick:inactiveHandler}
        className={`${styles.button} ${!props.isActive&&styles.inactive} ${props.buttonClicked&&styles.hidden}`}
        >
            {props.children}
        </button>
    )
}

export default Button