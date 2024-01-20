import React from "react";
import { useState } from "react";
import { useContext } from 'react'
import { CartContext } from '../../../../store/beam-cart-context'


import styles from './CrossSection.module.css'


const Results = () => {

    const { dataElement } = useContext(CartContext)
    const [element, setElement] = useState("")

  


    function postApi() {
        fetch("https://wgservice-apim.azure-api.net/api", {
            method: 'POST',
            body: JSON.stringify(dataElement),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((data) => {

                            const newElement = data.map(e =>
                                <div>
                    
                                    <div>height={e["height"]} </div> 
                                   <div>width= {e["width"]} </div> 
                                    <div>area= {e["area"]}</div>
                                    <div>perimeter= {e["perimeter"]}</div>
                                    
                                </div>
                            )

                            setElement(newElement)
                            
                            console.log(data)
                        })

                }
            })
    }



    return (
        <div className={styles.results}>
            <h4>Results</h4>
            <div>
                <button onClick={postApi}>POST</button>
                {element}
            </div>

        </div>
    )
}

export default Results