import { useContext } from 'react'
import { CartContext } from '../../../../../store/beam-cart-context'

import styles from '../DataElements.module.css'

const SelectConcrete = () => {

    const { dataElement, dataInputChanger } = useContext(CartContext)

const concreteCharacteristics =
{
    "C12/15": {'fck':12,"Ecm":27,"fctm":'1,6'},
    "C16/20": {'fck':16,"Ecm":29,"fctm":'1,9'},
    "C20/25": {'fck':20,"Ecm":30,"fctm":'2,2'},
    "C25/30": {'fck':25,"Ecm":31,"fctm":'2,6'},
    "C30/37": {'fck':30,"Ecm":32,"fctm":'2,9'},
    "C35/45": {'fck':35,"Ecm":34,"fctm":'3,2'},
    "C40/50": {'fck':40,"Ecm":35,"fctm":'3,5'},
    "C50/60": {'fck':50,"Ecm":37,"fctm":'4,1'}
}

    return (
        <>
            <label className={styles.intersection}>
                Concrete Class
                <select onChange={dataInputChanger} value={dataElement['concreteClass']} id={'concreteClass'} className={styles.concrete_class}>
                    <option value="C12/15">C12/15</option>
                    <option value="C16/20">C16/20</option>
                    <option value="C20/25">C20/25</option>
                    <option value="C25/30">C25/30</option>
                    <option selected value="C30/37">C30/37</option>
                    <option value="C35/45">C35/45</option>
                    <option value="C40/50">C40/50</option>
                    <option value="C50/60">C50/60</option>
                </select>
            </label>


            <div className={styles.intersection}>
                <div>{'fck = '}{concreteCharacteristics[dataElement.concreteClass]['fck']}{' [MPa]'}</div>
                <div>{'Ecm = '}{concreteCharacteristics[dataElement.concreteClass]['Ecm']}{' [GPa]'}</div>
            </div>
            <div className={styles.intersection}>
                <div> {'fctm = '}{concreteCharacteristics[dataElement.concreteClass]['fctm']}{' [MPa]'}</div>
                
            </div>
        </>
    )
}

export default SelectConcrete