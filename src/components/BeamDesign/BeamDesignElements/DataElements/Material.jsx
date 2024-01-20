import styles from './DataElements.module.css'
import SelectConcrete from './DataElementForm/SelectConcrete'
import SelectSteel from './DataElementForm/SelectSteel'
import SelectDiameter  from './DataElementForm/SelectDiameter'

const Material = () => {


    return (

        <>
            <form className={styles.section}>
            <div className={styles.header}><h5>Concrete Parameters</h5></div>

                <SelectConcrete/>
                

            </form>

            <form className={styles.section}>
            <div className={styles.header}><h5> Steel Parameters</h5></div>
                
                <SelectSteel/>

                <div className={styles.intersection}></div>
                <SelectDiameter name={' Steel diameters'} id={'steel_diameters'} description={'fs [mm] = '}/>
                <SelectDiameter name={' Stirrup diameters'} id={'stirrup_diameters'} description={'fis [mm] = '} />

            </form>

        </>
    )
}

export default Material
