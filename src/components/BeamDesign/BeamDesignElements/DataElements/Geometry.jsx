import styles from './DataElements.module.css'
import DataElementInput from './DataElementForm/DataElementInput'

const Geometry = () => {




    return (
        <>
            <form className={styles.section}>
                <div className={styles.header}><h5>Section Dimensions</h5></div>
                <DataElementInput name={'Width'} id={'width'} description={'bw [cm] = '} />
                <DataElementInput name={'Height'} id={'height'} description={'h [cm] = '} />
            </form>


            <form className={styles.section}>
            <div className={styles.header}><h5> Cover</h5></div>
                <DataElementInput name={'cnom [mm]'} id={'cnom'} description={''} />
                <DataElementInput name={'cnom.bottom [mm]'} id={'cnomBottom'} description={''} />
            </form>

            <form className={styles.section}>
            <div className={styles.header}><h5> Element Data</h5></div>
                <DataElementInput name={'Effective Length'} id={'effLength'} description={'leff [m] = '} />
                <DataElementInput name={'Coefficient'} id={'coefficient'} description={'ak [5/48] = '} />
            </form>

        </>
    )
}

export default Geometry