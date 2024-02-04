import { useContext } from "react"
import IntroButtons from "./IntroButtons"
import { CartContext } from "../../store/app-cart-context"

const Intro = () => {

    const { isLoggedIn, introHide } = useContext(CartContext)

    return (
        <>
            {(isLoggedIn && !introHide) && < IntroButtons />}
        </>

    )
}

export default Intro