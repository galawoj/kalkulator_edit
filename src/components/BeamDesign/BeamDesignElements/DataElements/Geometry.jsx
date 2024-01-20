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
            </form>


        </>
    )
}

export default Geometry
