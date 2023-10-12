import React, { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut

} from "firebase/auth";


import { auth } from './firebase';
import styles from './App.module.css';
import IntroButtons from "./components/Intro/IntroButtons";
import BeamDesign from "./components/BeamDesign/BeamDesign";
import Login from "./components/Login/Login";
import Navigation from './components/Navigation/Navigation';

function App() {




  const [beamClicked, setBeamClicked] = useState(false)
  const [hide, setHide] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInformation, setUserInformation] = useState(false)


  useEffect(() => {
    const storedUserLoggedInInformation = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(user)
        setUserInformation(user)
      } else {
        setIsLoggedIn(false)
        setUserInformation(false)
      }
    })
    return () => {
      storedUserLoggedInInformation()
    }

  })




  const loginHandler = (enteredEmail, enteredPassword) => {

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const registerHandler = (enteredEmail, enteredPassword) => {


    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        // Signed up 
        console.log(userCredential)


      })
      .catch((error) => {
        console.log(error)

      });


  }

  const logOutHandler = () => {
    signOut(auth).then(() => {
      console.log('log out successful')
      setIsLoggedIn(false)
    }).catch(error => console.log(error))



  }



  const beamDesignHandler = () => {
    setButtonClicked(true)                         //rozmycie buttonów
    setTimeout(() => { setHide(true) }, 600)          //usunięcie komponentu IntroButtons
    setTimeout(() => { setBeamClicked(true) }, 1400)  //dodanie komponentu BeamDesign
  }


  return (
    <>
      <div className={`${styles.container} ${hide && styles.fullscreen}`}>
        {!isLoggedIn ? (
          <Login onLogin={loginHandler} onRegister={registerHandler} />
        ) : (
          !hide && (
            <IntroButtons

              onBeamDesignHandler={beamDesignHandler}
              buttonClicked={buttonClicked}
            />
          )
        )}
        {beamClicked && <BeamDesign />}
      </div>

      {isLoggedIn && <Navigation
        buttonClicked={buttonClicked}
        user={userInformation}
        logOutHandler={logOutHandler}
        setButtonClicked={setButtonClicked}
        setHide={setHide}
        setBeamClicked={setBeamClicked}
        />}
    </>
  );
}

export default App;
