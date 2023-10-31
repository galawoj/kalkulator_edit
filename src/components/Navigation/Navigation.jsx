import { auth } from '../../firebase';
import { signOut } from "firebase/auth";

import styles from './Navigation.module.css'
import SubInfo from './SubInfo';


const Navigation = (props) => {

    const userEmail = props.user.email

    const closerHandler = () => {
        props.setHide(false)
        props.setBeamClicked(false)
        setTimeout(() => { props.setButtonClicked(false) }, 800)  //fade-in buttonów
    }

    const logOutHandler = () => {
        signOut(auth).then(() => {
            console.log('log out successful')
            props.setIsLoggedIn(false)
        }).catch(error => console.log(error))

    }

    

    return (
        <nav className={styles.navigation}>
            {props.buttonClicked
                ?
                <button onClick={closerHandler}>Main menu</button>
                :
                <button onClick={logOutHandler}>Log Out</button>
            }


            <div className={styles.informations}>{`Hi ${userEmail.substr(0, userEmail.indexOf('@'))} !`}</div>
            <div className={styles.informations}><h4>Your subscriptions:</h4></div>
            {props.userSubscriptions.steel&&(<SubInfo {...props} subName={"steel"}>Steel Member Design</SubInfo>)}
            {props.userSubscriptions.beam&&(<SubInfo {...props} subName={"beam"}>Beam Designer</SubInfo>)}
            {props.userSubscriptions.pad&&(<SubInfo {...props} subName={"pad"}>Pad Foundation Design</SubInfo>)}
            
        </nav>

    )
}

export default Navigation