import styles from './IntroButtons.module.css'

const IntroButtons = (props) => {  
 const introButtonHandler = props.onChangingClassHandler
    


    return (
        <>
            <button  className={` ${styles.button} ${props.clicked&&styles.hidden}`}>
                Steel member design
            </button>
            <button onClick={introButtonHandler} className={`${styles.button} ${props.clicked&&styles.hidden}`}>
                Beam design
            </button>
            <button  className={`${styles.button} ${props.clicked&&styles.hidden}`}>
                Pad foundation design
            </button>
        </>

    )
}
export default IntroButtons