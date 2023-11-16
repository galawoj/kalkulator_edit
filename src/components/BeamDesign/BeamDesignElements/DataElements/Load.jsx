import styles from './DataElements.module.css'
import DataElementInput from './DataElementForm/DataElementInput'


const Load = () => {


    return (
        <>
            <form className={styles.section}>
            <div className={styles.header}><h5>Bending Moment</h5></div>
                <DataElementInput name={'Design'} id={'design'} description={'MEd [kNm] = '} />
                <DataElementInput name={'Quasi - permament'} id={'quasi'} description={'MEd.lt [kNm] = '} />
            </form>
        </>
    )
}

export default Load