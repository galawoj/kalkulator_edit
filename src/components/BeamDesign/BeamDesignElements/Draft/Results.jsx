import React from "react";
import { useState } from "react";
import { useContext } from 'react'
import { CartContext } from '../../../../store/beam-cart-context'


import styles from './Draft.module.css'
import Loader from "../../../../common/Loader";


const Results = () => {

    const { dataElement } = useContext(CartContext)
    const [element, setElement] = useState("")
    const [waitingForResult, setWaitingForResult] = useState(false)

    function postApi() {
        fetch("https://wgservice-apim.azure-api.net/api", {
            method: 'POST',
            body: JSON.stringify(dataElement),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(setWaitingForResult(true))
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
                            setWaitingForResult(false)
                            setElement(newElement)
                            
                            console.log(data)
                        })

                }
            })
    }


    return (
        <div className={styles.resultsContainer}>


            <button className={styles.button} onClick={postApi}>RESULTS</button>

            <div className={styles.draft}>
            {waitingForResult ? <Loader/> : element}
            </div>
                
                
         



        </div>
    )
}

export default Results