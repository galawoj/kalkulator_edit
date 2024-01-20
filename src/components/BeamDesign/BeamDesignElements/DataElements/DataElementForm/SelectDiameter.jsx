import { useContext } from 'react'
import { CartContext } from '../../../../../store/beam-cart-context'

import styles from '../DataElements.module.css'

const SelectDiameter = (props) => {

    const {dataElement,dataInputChanger} = useContext(CartContext)

    return (
        <label className={styles.intersection}>
        {props.name}
        <div>
        {props.description}
        <select onChange={dataInputChanger} value={dataElement[props.id]}  id={props.id}>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option selected value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
            <option value="22">22</option>
            <option value="25">25</option>
            <option value="28">28</option>
            <option value="32">32</option>
        </select>
        </div>
       
    </label>
    )
}

export default SelectDiameter