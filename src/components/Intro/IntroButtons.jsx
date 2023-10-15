
import Button from './Button'

const IntroButtons = (props) => {  

    const steelIsActive =false
    const beamIsActive = true
    const padIsActive =false


    return (
        <>
            <Button isActive={steelIsActive}  {...props}>
                Steel member design
            </Button>

            <Button isActive={beamIsActive} onClick={props.onBeamDesignHandler} {...props}>
                Beam design
            </Button>
            
            <Button  isActive={padIsActive} {...props}>
                Pad foundation design
            </Button>
            
        </>

    )
}
export default IntroButtons