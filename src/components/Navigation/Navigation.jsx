

import { auth,db } from '../../firebase';
import { signOut } from "firebase/auth";
import {updateDoc,doc} from "firebase/firestore"
import styles from './Navigation.module.css'
import SubInfo from './SubInfo';
import { useContext } from 'react';
import { CartContext } from '../../store/app-cart-context';


const Navigation = () => {

const {
    setIntroHide,
    setBeamClicked,
    setIntroButtonClicked,
    setIsLoggedIn,
    subscriptions,
    isLoggedIn,
    userDocumentName,
    introButtonClicked,
    setWaitingForSignIn
} =useContext(CartContext)

    const isThereAnySubscription = 
      subscriptions.steel ||
      subscriptions.beam ||
      subscriptions.pad;

    const userEmail = isLoggedIn.email

    const closerHandler = () => {
        setIntroHide(false)
        setBeamClicked(false)
        setTimeout(() => { setIntroButtonClicked(false) }, 800)  //fade-in buttonów
    }

    const logOutHandler = () => {
        signOut(auth).then(() => {
            setIsLoggedIn(false)
            setWaitingForSignIn(false)
        }).catch(error => console.log(error))
        
        updateDoc(doc(db, "users", userDocumentName), {
            'startSession': null
          })
    }



    return (
        <nav className={styles.navigation}>
            {introButtonClicked
                ?
                <button onClick={closerHandler}>Main menu</button>
                :
                <button onClick={logOutHandler}>Log Out</button>
            }


            <div className={styles.informations}>{`Hi ${userEmail.substr(0, userEmail.indexOf('@'))} !`}</div>


            {isThereAnySubscription ? <div className={styles.informations}><h4>Your subscriptions:</h4></div> : null}
            {subscriptions.steel && (<SubInfo subName={"steel"}>Steel Member Design</SubInfo>)}
            {subscriptions.beam && (<SubInfo subName={"beam"}>Beam Designer</SubInfo>)}
            {subscriptions.pad && (<SubInfo subName={"pad"}>Pad Foundation Design</SubInfo>)}

        </nav>

    )
}

export default Navigation