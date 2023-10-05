import IntroButtons from "./components/Intro/IntroButtons";
import BeamDesign from "./components/BeamDesign/BeamDesign";
import styles from './App.module.css';
import React, {useState} from 'react';


function App() {




const [clicked,setClicked] = useState(false)

const changingClassHandler = () =>{
  setClicked(true)
}

  return (
    <div className={`${styles['container']} ${clicked&&styles.fullscreen}`}>
    <IntroButtons onChangingClassHandler={changingClassHandler} clicked={clicked}   />
    {clicked&&<BeamDesign/>}
    </div>
  )
}

export default App;
