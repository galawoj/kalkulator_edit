import { useContext } from 'react'
import { CartContext } from '../../../../../store/beam-cart-context'

import styles from '../DataElements.module.css'



const DataElementInput = (props) => {

    const {dataElement,onSetDataElement} = useContext(CartContext)

    const dataInputChanger = (e) => {
        onSetDataElement((actualData) => {
            actualData[e.target.id] = e.target.value
            return { ...actualData }
        })
        console.log(dataElement)
    }


    return (
        <label className={styles.intersection}>
            {props.name}

            <div>
                {props.description}
                <input
                    id={props.id}
                    value={dataElement[props.id]}
                    onChange={dataInputChanger}
                    type="number"
                />
            </div>
        </label>
    )
}
export default DataElementInput
