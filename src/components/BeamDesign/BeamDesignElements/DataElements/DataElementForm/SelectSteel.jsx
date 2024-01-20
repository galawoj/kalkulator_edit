import { useContext } from 'react'
import { CartContext } from '../../../../../store/beam-cart-context'

import styles from '../DataElements.module.css'

const SelectSteel = () => {

    const {dataElement,dataInputChanger} = useContext(CartContext)


    return (
        <label className={styles.intersection}>
        Steel Grade
        <select onChange={dataInputChanger} value={dataElement['steelGrade']}  id={'steelGrade'}>
            <option value="B400">B400</option>
            <option value="B500">B500</option>
        </select>
    </label>
    )
}

export default SelectSteel