import styles from './IntroButtons.module.css'

const Button = (props) =>{



    return(
        <button onClick={props.onClick} className={`${styles.button} ${!props.isActive&&styles.inactive} ${props.buttonClicked&&styles.hidden}`}>
            {props.children}
        </button>
    )
}

export default Button