import styles from './DataElements.module.css'
import DataElementInput from './DataElementForm/DataElementInput'

const Geometry = (props) => {




    return (
        <>
            <form className={styles.section}>
                <div className={styles.header}><h5>Section Dimensions</h5></div>
                <DataElementInput {...props} name={'Width'} id={'width'} description={'bw [cm] = '} />
                <DataElementInput {...props} name={'Height'} id={'height'} description={'h [cm] = '} />
            </form>


            <form className={styles.section}>
            <div className={styles.header}><h5> Cover</h5></div>
                <DataElementInput {...props} name={'cnom [mm]'} id={'cnom'} description={''} />
                <DataElementInput {...props} name={'cnom.bottom [mm]'} id={'cnomBottom'} description={''} />
            </form>

            <form className={styles.section}>
            <div className={styles.header}><h5> Element Data</h5></div>
                <DataElementInput {...props} name={'Effective Length'} id={'effLength'} description={'leff [m] = '} />
                <DataElementInput {...props} name={'Coefficient'} id={'coefficient'} description={'ak [5/48] = '} />
            </form>

        </>
    )
}

export default Geometry