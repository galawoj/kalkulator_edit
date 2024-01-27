
import { useContext } from 'react'
import Button from './Button'
import { CartContext } from '../../store/app-cart-context'


const IntroButtons = () => {  

    const {onBeamDesignHandler,subscriptions} =useContext(CartContext)

    return (
        <>
            <Button isActive={subscriptions.steel} subName={"steel"}>
                Steel member design
           </Button>

            <Button isActive={subscriptions.beam} subName={"beam"} onClick={onBeamDesignHandler}>
                Beam design
            </Button>
            
            <Button  isActive={subscriptions.pad} subName={"pad"}>
                Pad foundation design
            </Button>
            
        </>

    )
    
   
}
export default IntroButtons