import { useContext } from 'react'
import { CartContext } from '../../../../../store/beam-cart-context'

import styles from '../DataElements.module.css'

const SelectConcrete = () => {

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
            Concrete Class
            <select onChange={dataInputChanger} value={dataElement['concreteClass']} id={'concreteClass'} className={styles.concrete_class}>
                <option value="C12/15">C12/15</option>
                <option value="C16/20">C16/20</option>
                <option value="20/25">20/25</option>
                <option value="25/30">25/30</option>
                <option selected value="30/37">30/37</option>
                <option value="35/45">35/45</option>
                <option value="40/50">40/50</option>
                <option value="50/60">50/60</option>
            </select>

        </label>
    )
}

export default SelectConcrete