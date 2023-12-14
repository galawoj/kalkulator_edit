import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import styles from "./Navigation.module.css"

const UnsubButton = (props) =>{

    
   const updateSubHandler = async () =>{

    
    // Create an initial document to update.
    const docRef =  doc(db, "users", `${props.userDocumentName}/subscriptionsCollection/subscriptions`);

    await updateDoc(docRef, {
        [`${props.subName}`]: null
    });
    }

    

    return(
        <button className={styles.unsubButton} onClick={updateSubHandler}>
            {props.children}
        </button>
    )
}

export default UnsubButton