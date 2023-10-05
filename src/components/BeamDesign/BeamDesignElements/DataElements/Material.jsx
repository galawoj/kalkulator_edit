import styles from './DataElements.module.css'
import DataElementInput from './DataElementForm/DataElementInput'
import SelectConcrete from './DataElementForm/SelectConcrete'
import SelectSteel from './DataElementForm/SelectSteel'

const Material = (props) => {


    return (

        <>
            <form className={styles.section}>
                <h5>Concrete Parameters</h5>

                <SelectConcrete {...props} />


                <div className={styles.intersection}>
                    <div>{'fck [MPa]='} </div>
                    <div>{'Ecm [GPa]='}</div>
                </div>
                <div className={styles.intersection}>
                    <div> {'fctm [MPa]='}</div>
                    <div>{'c.lim[%o]='}</div>
                </div>

                <div className={styles.section}>
                    <h5> Long-term parameters</h5>
                    <DataElementInput {...props} name={'Relative Humidty'} id={'RH'} description={'RH [%] = '} />
                    <DataElementInput {...props} name={'Age of concrete at loading t0'} id={'age_t0'} description={'days [%] = '} />
                </div>


            </form>

            <form className={styles.section}>
                <h5> Steel Parameters</h5>
                <SelectSteel {...props} />

                <div className={styles.intersection}></div>
                <DataElementInput {...props} name={'Steel diameters'} id={'steel_diameters'} description={'fid [mm] = '} />
                <DataElementInput {...props} name={' Stirrup diameters'} id={'stirrup_diameters'} description={'fis [mm] = '} />

            </form>

        </>
    )
}

export default Material