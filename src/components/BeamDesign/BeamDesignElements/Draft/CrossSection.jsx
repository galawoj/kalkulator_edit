import { useContext } from 'react'
import { CartContext } from '../../../../store/beam-cart-context'

import styles from './Draft.module.css'

const CrossSection = () => {

    const { dataElement } = useContext(CartContext)


    const scale = 200 / dataElement.height

    const styleCrossSection = {
        width: `${dataElement.width * scale}px`,
        //height:`${dataElement.height*scale}px`,
        padding: `${dataElement.cnom * scale * 0.1}px`
    }

    const styleStirrup = {
        border: `${dataElement.stirrup_diameters * scale * 0.1}px ridge black`,
        borderRadius: `${dataElement.stirrup_diameters * scale * 0.1 * (1 + 2)}px`,
    }

    const styleSteel = {
        width: `${dataElement.steel_diameters * scale * 0.1}px`,
        height: `${dataElement.steel_diameters * scale * 0.1}px`,
        margin: `${0.2 * dataElement.stirrup_diameters * scale * 0.1}px`,
    }




    return (
        <>

            <div className={styles.crossSection} style={styleCrossSection} >
                <div className={styles.stirrup} style={styleStirrup}>

                    <div className={styles.rowSteel}>
                        <div className={styles.steel} style={styleSteel}></div>
                        <div className={styles.steel} style={styleSteel}></div>
                    </div>

                    <div className={styles.rowSteel}>
                        <div className={styles.steel} style={styleSteel}></div>
                        <div className={styles.steel} style={styleSteel}></div>
                        <div className={styles.steel} style={styleSteel}></div>
                        <div className={styles.steel} style={styleSteel}></div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default CrossSection