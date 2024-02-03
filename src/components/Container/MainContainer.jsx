import styles from './MainContainer.module.css'

import { useContext } from "react"
import { CartContext } from "../../store/app-cart-context"


const MainContainer = ({children}) =>{

const{hide} = useContext(CartContext)

    return(
<div className={`${styles.container} ${hide && styles.fullscreen}`}>
    {children}
</div>

    )
}

export default MainContainer