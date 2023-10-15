import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { collection, addDoc,setDoc, doc } from "firebase/firestore"; 
import {db} from './firebase'
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
  const [loginSuccesion,SetLoginSuccesion] = useState(false)
  const [registrationSuccesion,setRegistrationSuccesion] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInformation, setUserInformation] = useState(false)


const newUser = async (user) =>{
  const docRef = doc(db,"users",user.email);
  const payload = {
  'id':user.uid,
  'email':user.email,
  'subscriptions':{'steel':false, 'beam':false, 'pad':false}
  }
  await setDoc(docRef,payload)
}

  //Authentication handlers -START


 const loginHandler = (enteredEmail, enteredPassword) => {

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        console.log(userCredential)
        SetLoginSuccesion(false)
  
      })
      .catch((error) => {
        SetLoginSuccesion(error)
      });
  }

const registerHandler = (enteredEmail, enteredPassword) => {

    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => { 
        newUser(userCredential.user) 
        console.log(userCredential)
        setRegistrationSuccesion(false)
       
      })
      .catch((error) => {
        setRegistrationSuccesion(error)
      });
  }

 //Authentication handlers -END




  useEffect(() => {
    const storedUserLoggedInformation = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(user)
        setUserInformation(user)
      } else {
        setIsLoggedIn(false)
        setUserInformation(false)
      }
    })
    return () => {
      storedUserLoggedInformation()
    }

  })


  const beamDesignHandler = () => {
    setButtonClicked(true)                         //rozmycie buttonów
    setTimeout(() => { setHide(true) }, 600)          //usunięcie komponentu IntroButtons
    setTimeout(() => { setBeamClicked(true) }, 1400)  //dodanie komponentu BeamDesign
  }


  return (
    <>
      <div className={`${styles.container} ${hide && styles.fullscreen}`}>
        {!isLoggedIn ? (
          <Login loginSuccesion={loginSuccesion} registrationSuccesion={registrationSuccesion} onLogin={loginHandler} onRegister={registerHandler} />
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
        setIsLoggedIn={setIsLoggedIn}
        setButtonClicked={setButtonClicked}
        setHide={setHide}
        setBeamClicked={setBeamClicked}
        />}
    </>
  );
}

export default App;
