import IntroButtons from "./components/Intro/IntroButtons";
import BeamDesign from "./components/BeamDesign/BeamDesign";
import styles from './App.module.css';
import React, { useState } from 'react';


function App() {




  const [beamClicked, setBeamClicked] = useState(false)
  const [hide, setHide] = useState(false)
  const [buttonClicked,setButtonClicked] = useState(false)


  const beamDesignHandler = () => {
    setButtonClicked(true)                         //rozmycie buttonów
    setTimeout(()=>{setHide(true)}, 600)          //usunięcie komponentu IntroButtons
    setTimeout(()=>{setBeamClicked(true)},1400)  //dodanie komponentu BeamDesign
  }

  
  return (
      <div className={`${styles.container} ${hide && styles.fullscreen}`}>
      {!hide && <IntroButtons onBeamDesignHandler={beamDesignHandler} buttonClicked={buttonClicked} />}
      {beamClicked && <BeamDesign />}
    </div>
  )
}

export default App;
