import { useContext } from "react"
import IntroButtons from "./IntroButtons"
import { CartContext } from "../../store/app-cart-context"

const Intro = () => {

    const { isLoggedIn, hide } = useContext(CartContext)

    return (
        <>
            {(isLoggedIn && !hide) && < IntroButtons />}
        </>

    )
}

export default Intro