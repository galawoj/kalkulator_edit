import { useContext } from "react"
import BeamDesign from "../BeamDesign/BeamDesign"
import { CartContext } from "../../store/app-cart-context"


const CalculatorModule = () => {

    const { beamClicked } = useContext(CartContext)

    return (
<>
{ beamClicked && <BeamDesign />} 
</>


)

}

export default CalculatorModule