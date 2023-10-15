import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import styles from './Navigation.module.css'


const Navigation = (props) => {

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
        <nav>
            {props.buttonClicked ?
                <button onClick={closerHandler}>Main menu</button>
                :
                <button onClick={logOutHandler}>Log Out</button>
            }


            <p>{`Hi ${props.user.email.substr(0, props.user.email.indexOf('@'))}`}</p>
        </nav>

    )
}

export default Navigation