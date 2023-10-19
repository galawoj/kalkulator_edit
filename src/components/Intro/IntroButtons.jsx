
import Button from './Button'


const IntroButtons = (props) => {  

    

    return (
        <>
            <Button isActive={props.userSubscriptions.steel} subName={"steel"}  {...props}>
                Steel member design
            </Button>

            <Button isActive={props.userSubscriptions.beam} subName={"beam"} onClick={props.onBeamDesignHandler} {...props}>
                Beam design
            </Button>
            
            <Button  isActive={props.userSubscriptions.pad} subName={"pad"} {...props}>
                Pad foundation design
            </Button>
            
        </>

    )
    
   
}
export default IntroButtons