import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
const SubButton = (props) =>{

    
   const updateSubHandler = async()=>{

    
    // Create an initial document to update.
    const docRef =  doc(db, "users", `${props.userDocumentName}`);



    await updateDoc(docRef, {
        [`subscriptions.${props.subName}`]: false
    });
    }

    return(
        <button onClick={updateSubHandler}>
            {props.children}
        </button>
    )
}

export default SubButton