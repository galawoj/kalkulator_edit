import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import styles from "./Navigation.module.css"
import { useContext } from "react";
import { CartContext } from "../../store/app-cart-context";

const UnsubButton = (props) =>{

    const {userDocumentName} = useContext(CartContext)
    
   const updateSubHandler = async () =>{

    
    // Create an initial document to update.
    const docRef =  doc(db, "users", `${userDocumentName}/subscriptionsCollection/subscriptions`);

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