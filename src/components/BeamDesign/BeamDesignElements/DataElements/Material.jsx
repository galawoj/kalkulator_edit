import styles from './DataElements.module.css'
import DataElementInput from './DataElementForm/DataElementInput'
import SelectConcrete from './DataElementForm/SelectConcrete'
import SelectSteel from './DataElementForm/SelectSteel'

const Material = () => {


    return (

        <>
            <form className={styles.section}>
            <div className={styles.header}><h5>Concrete Parameters</h5></div>

                <SelectConcrete/>
                
                <div className={styles.intersection}>
                    <div>{'fck [MPa]='} </div>
                    <div>{'Ecm [GPa]='}</div>
                </div>
                <div className={styles.intersection}>
                    <div> {'fctm [MPa]='}</div>
                    <div>{'c.lim[%o]='}</div>
                </div>

                <div className={styles.section}>
                <div className={styles.header}><h5> Long-term parameters</h5></div>
                    <DataElementInput name={'Relative Humidty'} id={'RH'} description={'RH [%] = '} />
                    <DataElementInput name={'Age of concrete at loading t0'} id={'age_t0'} description={'days [%] = '} />
                </div>


            </form>

            <form className={styles.section}>
            <div className={styles.header}><h5> Steel Parameters</h5></div>
                <SelectSteel/>

                <div className={styles.intersection}></div>
                <DataElementInput name={'Steel diameters'} id={'steel_diameters'} description={'fid [mm] = '} />
                <DataElementInput name={' Stirrup diameters'} id={'stirrup_diameters'} description={'fis [mm] = '} />

            </form>

        </>
    )
}

export default Material