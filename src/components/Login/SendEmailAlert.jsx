import styles from './Login.module.css'

import imageContent from '../../images/pngwing.png'

const SendEmailAlert = (props) => {


    return (

        
        <div className={styles.alert}>
            <img className={styles.image} src={imageContent} alt="" />
            <div className={styles.infoEmail}>

                Verification email has been sent to <b>{props.enteredEmail}</b>. <br />
                Please check your mailbox to verify the account before you sign in.

            </div>
            <button className={styles.typeFormButton} onClick={props.onSwitchHandler}>
                Sign in
            </button>
        </div>
    )
}

export default SendEmailAlert