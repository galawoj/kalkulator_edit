import styles from './CrossSection.module.css'

const CrossSection = (props) => {

    const scale = 200 / props.dataElement.height

    const styleCrossSection = {
        width: `${props.dataElement.width * scale}px`,
        //height:`${props.dataElement.height*scale}px`,
        padding: `${props.dataElement.cnom * scale * 0.1}px`
    }

    const styleStirrup = {
        border: `${props.dataElement.stirrup_diameters * scale * 0.1}px ridge black`,
        borderRadius: `${props.dataElement.stirrup_diameters * scale * 0.1 * (1 + 2)}px`,
    }

    const styleSteel = {
        width: `${props.dataElement.steel_diameters * scale * 0.1}px`,
        height: `${props.dataElement.steel_diameters * scale * 0.1}px`,
        margin: `${0.2 * props.dataElement.stirrup_diameters * scale * 0.1}px`,
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
            <div className={styles.results}>
                <h4>Results</h4>
            </div>
        </>
    )

}

export default CrossSection