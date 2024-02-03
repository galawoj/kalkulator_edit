import { useContext } from "react"
import Navigation from "./Navigation"

import { CartContext } from "../../store/app-cart-context"

const NavigationPanel =() =>{

    const {isLoggedIn} = useContext(CartContext)

    return (
<>
{isLoggedIn && <Navigation/>}
</>
    )

}
export default NavigationPanel