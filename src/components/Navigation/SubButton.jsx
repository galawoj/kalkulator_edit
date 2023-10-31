import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import styles from "./Navigation.module.css"

const SubButton = (props) =>{

    
   const updateSubHandler = async()=>{

    
    // Create an initial document to update.
    const docRef =  doc(db, "users", `${props.userDocumentName}`);

    await updateDoc(docRef, {
        [`subscriptions.${props.subName}`]: false
    });
    }

    return(
        <button className={styles.unsubButton} onClick={updateSubHandler}>
            {props.children}
        </button>
    )
}

export default SubButton