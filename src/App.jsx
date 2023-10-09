import styles from './App.module.css';
import React, { useState,useEffect } from 'react';
import IntroButtons from "./components/Intro/IntroButtons";
import BeamDesign from "./components/BeamDesign/BeamDesign";
import Login from "./components/Login/Login";

function App() {




  const [beamClicked, setBeamClicked] = useState(false)
  const [hide, setHide] = useState(false)
  const [buttonClicked,setButtonClicked] = useState(false)
  const [isLoggedIn, setIsLoggedIn]= useState(false)

useEffect(()=>{
  const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn')

  if(storedUserLoggedInInformation ==='1'){
    setIsLoggedIn(true)
  }

},[])




  const loginHandler = (enteredEmail, enteredPassword) =>{

    localStorage.setItem('isLoggedIn','1')
    setIsLoggedIn(true)

  }

  const logOutHandler = () =>{
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)

  }



  const beamDesignHandler = () => {
    setButtonClicked(true)                         //rozmycie buttonów
    setTimeout(()=>{setHide(true)}, 600)          //usunięcie komponentu IntroButtons
    setTimeout(()=>{setBeamClicked(true)},1400)  //dodanie komponentu BeamDesign
  }

  
  return (
      
      <div className={`${styles.container} ${hide && styles.fullscreen}`}>
        
      {!isLoggedIn && <Login onLogin={loginHandler}/>}
      {isLoggedIn && !hide && <IntroButtons logOutHandler={logOutHandler} onBeamDesignHandler={beamDesignHandler} buttonClicked={buttonClicked} />}
      {beamClicked && <BeamDesign />}
    </div>
  )
}

export default App;
