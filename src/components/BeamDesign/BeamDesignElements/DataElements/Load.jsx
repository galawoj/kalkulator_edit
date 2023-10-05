import styles from './DataElements.module.css'
import DataElementInput from './DataElementForm/DataElementInput'


const Load = (props) => {


    return (
        <>
            <form className={styles.section}>
                <h5>Bending Moment</h5>
                <DataElementInput {...props} name={'Design'} id={'design'} description={'MEd [kNm] = '} />
                <DataElementInput {...props} name={'Quasi - permament'} id={'quasi'} description={'MEd.lt [kNm] = '} />
            </form>
        </>
    )
}

export default Load