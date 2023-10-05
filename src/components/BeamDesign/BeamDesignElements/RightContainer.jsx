import styles from './BeamDesignElements.module.css'
import CrossSection from './Draft/CrossSection'

const RightContainer = (props) =>{
    return(
<div className={styles.rightContainer}>

<CrossSection {...props} />

</div>
    )
}
export default RightContainer