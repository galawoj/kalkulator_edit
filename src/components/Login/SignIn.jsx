import { useContext } from "react"
import SignInForm from "./SignInForm"
import Loader from "../../common/Loader"
import { CartContext } from "../../store/app-cart-context"


const SignIn = (props) => {

    const { waitingForSignIn } = useContext(CartContext)
console.log(waitingForSignIn)

    return (
        <>
            {waitingForSignIn ? <Loader /> : <SignInForm {...props} />}
        </>
    )

}

export default SignIn