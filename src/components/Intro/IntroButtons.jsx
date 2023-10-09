import styles from './IntroButtons.module.css'
import Button from './Button'

const IntroButtons = (props) => {  

    


    return (
        <>
            <Button  {...props}>
                Steel member design
            </Button>

            <Button onClick={props.onBeamDesignHandler} {...props}>
                Beam design
            </Button>
            
            <Button  {...props}>
                Pad foundation design
            </Button>
            <button className={styles.logout} onClick={props.logOutHandler}>Log Out</button>
        </>

    )
}
export default IntroButtons