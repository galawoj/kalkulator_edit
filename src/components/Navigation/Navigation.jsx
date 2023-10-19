import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import SubButton from './SubButton'
import styles from './Navigation.module.css'



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
            {props.userSubscriptions.steel&&(<SubButton {...props} subName={"steel"}>Steel Member Design</SubButton>)}
            {props.userSubscriptions.beam&&(<SubButton {...props} subName={"beam"}>Beam Designer</SubButton>)}
            {props.userSubscriptions.pad&&(<SubButton {...props} subName={"pad"}>Pad Foundation Design</SubButton>)}
            
        </nav>

    )
}

export default Navigation