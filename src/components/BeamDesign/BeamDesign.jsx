import React, { useState } from 'react';

import LeftContainer from "./BeamDesignElements/LeftContainer"
import RightContainer from "./BeamDesignElements/RightContainer"
import { CartContext } from '../../store/beam-cart-context';



const BeamDesign = () => {


    const [dataElement, setDataElement] = useState({
        width: "25",
        height: "50",
        cnom: "25",
        concreteClass: "C30/37",
        steelGrade: "AIIIN",
        steel_diameters: "16",
        stirrup_diameters: "8",
        design: "100"
    })

    const dataInputChanger = (e) => {
        setDataElement((actualData) => {
            actualData[e.target.id] = e.target.value
            return { ...actualData }
        })
        console.log(dataElement)
    }



    const ctxValue = {
        dataElement: dataElement,
        dataInputChanger: dataInputChanger
    }


return (
    <CartContext.Provider value={ctxValue}>
        <LeftContainer />
        <RightContainer />
    </CartContext.Provider>

)
}

export default BeamDesign