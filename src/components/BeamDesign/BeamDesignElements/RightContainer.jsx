import styles from './BeamDesignElements.module.css'
import CrossSection from './Draft/CrossSection'
import Results from './Draft/Results'

const RightContainer = () =>{
    return(
<div className={styles.rightContainer}>

<CrossSection/>
<Results/>
</div>
    )
}
export default RightContainer