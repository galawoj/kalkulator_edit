
import styles from './Navigation.module.css'

const Navigation = (props) =>{

 const closerHandler = () =>{
    props.setHide(false)   
    props.setBeamClicked(false)                     
    setTimeout(() => { props.setButtonClicked(false) }, 800)  //fade-in buttonów
}

    return(
        <nav>
{props.buttonClicked?
<button onClick={closerHandler}>Main menu</button>
:
<button onClick={props.logOutHandler}>Log Out</button>
}


<div>{`Hi ${props.user.email}`}</div>

        </nav>
        
    )
}

export default Navigation