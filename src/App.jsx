import React, { useState, useEffect } from 'react';

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { setDoc, doc, onSnapshot, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
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
  const [loginTime, setLoginTime] = useState(false)

  const userDocumentName = isLoggedIn.email

  const newUser = async (user) => {

    const docRef = doc(db, "users", `${user.email}`);
    const payload = {
      'id': user.uid,
      'email': user.email,
      'subscriptions': { 'steel': null, 'beam': null, 'pad': null },


    }
    await setDoc(docRef, payload)
  }


  //Authentication handlers -START


  const loginHandler = (enteredEmail, enteredPassword) => {

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
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


  }, [])


  async function checkIfDocumentExists(docPath) {
    const docRef = doc(db, docPath);

    const docSnap = await getDoc(docRef);


    if (docSnap.exists()) {

      const update = updateDoc(doc(db, "users", userDocumentName), {
        'startSession': serverTimestamp()

      })

      const unsub = onSnapshot(doc(db, "users", userDocumentName), (doc) => {
        const userSubscriptions = doc.data().subscriptions
        setSubscriptions(userSubscriptions)

        const startSession = doc.data().startSession
        setLoginTime(startSession)

      },
        err => {
          console.log("error")
        }
      )

      return () => {
        unsub()
        update()
      }
    }
  }

  useEffect(() => {

    checkIfDocumentExists(`users/${userDocumentName}`)

  }, [userDocumentName, isLoggedIn])


  //timer of session
  useEffect(() => {
    if (isLoggedIn && loginTime) {
      let t = 0
      setInterval(() => {
        t += 1


          let timeSession = loginTime

         timeSession = timeSession>0? loginTime.toDate().getTime() + t * 1000 : null
          

          if(t%10===0){
            const update = updateDoc(doc(db, "users", userDocumentName), {
              'startSession': new Date(timeSession)
                  })
          }


      }, 1000)
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
        loginTime={loginTime}
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
