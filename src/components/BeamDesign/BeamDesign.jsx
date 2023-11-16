import React, { useState } from 'react';

import LeftContainer from "./BeamDesignElements/LeftContainer"
import RightContainer from "./BeamDesignElements/RightContainer"
import { CartContext } from '../../store/beam-cart-context';



const BeamDesign = () => {


    const [dataElement, setDataElement] = useState({
        width: "25",
        height: "50",
        cnom: "25",
        cnomBottom: "25",
        effLength: "3",
        coefficient: "25",
        concreteClass: "30/37",
        RH: '40',
        age_t0: "28",
        steelGrade: "AIIIN",
        steel_diameters: "16",
        stirrup_diameters: "8",
        design: "100",
        quasi: "25"
    })

    const ctxValue={
dataElement:dataElement,
onSetDataElement:setDataElement
    }

    return (
        <CartContext.Provider value={ctxValue}>
            <LeftContainer/>
            <RightContainer/>
        </CartContext.Provider>

    )
}

export default BeamDesign