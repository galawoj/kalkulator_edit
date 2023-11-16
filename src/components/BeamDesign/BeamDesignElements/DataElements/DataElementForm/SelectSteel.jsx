import { useContext } from 'react'
import { CartContext } from '../../../../../store/beam-cart-context'

import styles from '../DataElements.module.css'

const SelectSteel = () => {

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
        Steel Grade
        <select onChange={dataInputChanger} value={dataElement['steelGrade']}  id={'steelGrade'}>
            <option value="AIIIN">AIIIN</option>
            <option value="B500W">B500W</option>
        </select>
    </label>
    )
}

export default SelectSteel