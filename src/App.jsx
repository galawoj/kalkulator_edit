import React, { useState, useEffect } from 'react';

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { setDoc, doc, onSnapshot,getDoc } from "firebase/firestore";
import { auth, db } from './firebase';
import styles from './App.module.css';
import IntroButtons from "./components/Intro/IntroButtons";
import BeamDesign from "./components/BeamDesign/BeamDesign";
import Login from "./components/Login/Login";
import Navigation from './components/Navigation/Navigation';

function App() {


  const [beamClicked, setBeamClicked] = useState(false)
  const [hide, setHide] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [loginSucces, setLoginSucces] = useState(false)
  const [registrationSucces, setRegistrationSucces] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [subscriptions, setSubscriptions] = useState(false)

  const userDocumentName = isLoggedIn.email

  const newUser = async (user) => {

    const docRef = doc(db, "users", `${user.email}`);
    const payload = {
      'id': user.uid,
      'email': user.email,
      'subscriptions': { 'steel': false, 'beam': false, 'pad': false }
    }
    await setDoc(docRef, payload)
  }


  //Authentication handlers -START


  const loginHandler = (enteredEmail, enteredPassword) => {

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        console.log(userCredential)
        setLoginSucces(false)
        setRegistrationSucces(false)

      })
      .catch((error) => {
        setLoginSucces(error)
      });
  }

  const registerHandler = (enteredEmail, enteredPassword) => {

    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        newUser(userCredential.user)
        console.log(userCredential)
        setRegistrationSucces(false)
        setLoginSucces(false)

      })
      .catch((error) => {
        setRegistrationSucces(error)
      });
  }

  //Authentication handlers -END



  useEffect(() => {
    const storedUserLoggedInformation = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(user)
      } else {
        setIsLoggedIn(false)
      }
    })
    return () => storedUserLoggedInformation()
  })

  async function checkIfDocumentExists(docPath) {
    const docRef = doc(db, docPath);
  
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {



      const unsub = onSnapshot(doc(db, "users", userDocumentName), (doc) => {
        const userSubscriptions = doc.data().subscriptions
  
        setSubscriptions(userSubscriptions)
        console.log(userSubscriptions)
      },
        err => {
          // TODO: handle errors;
        }
      )
      return () => unsub()
    } else {
      console.log("błąd")
    }
  }




  useEffect(() => {
    console.log(userDocumentName)


    checkIfDocumentExists(`users/${userDocumentName}`)


  }, [userDocumentName, isLoggedIn])







  const beamDesignHandler = () => {
    setButtonClicked(true)                         //rozmycie buttonów
    setTimeout(() => { setHide(true) }, 600)          //usunięcie komponentu IntroButtons
    setTimeout(() => { setBeamClicked(true) }, 1400)  //dodanie komponentu BeamDesign
  }






  return (
    <>
      <div className={`${styles.container} ${hide && styles.fullscreen}`}>
        {!isLoggedIn ? (
          <Login
            onSetLoginSucces={setLoginSucces}
            onSetRegistrationSucces={setRegistrationSucces}
            loginSucces={loginSucces}
            registrationSucces={registrationSucces}
            onLogin={loginHandler}
            onRegister={registerHandler}
          />
        ) : (
          !hide && (
            <IntroButtons
              userDocumentName={userDocumentName}
              userSubscriptions={subscriptions}
              onBeamDesignHandler={beamDesignHandler}
              buttonClicked={buttonClicked}
            />
          )
        )}
        {beamClicked && <BeamDesign />}
      </div>

      {isLoggedIn && <Navigation
        userDocumentName={userDocumentName}
        userSubscriptions={subscriptions}
        buttonClicked={buttonClicked}
        user={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setButtonClicked={setButtonClicked}
        setHide={setHide}
        setBeamClicked={setBeamClicked}
      />}
    </>
  );
}

export default App;
