import React, { useState, useEffect } from 'react';
import { CartContext } from './store/app-cart-context'

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "firebase/auth";

import {
  setDoc,
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

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
  const [subscriptionsTime, setSubscriptionsTime] = useState(false)
  const [loginTime, setLoginTime] = useState(false)
  const [sessionTime, setSessionTime] = useState(false)
  const [sendEmailInfo, setSendEmailInfo] = useState(false)

  const userDocumentName = isLoggedIn.email

  const newUser = async (user) => {


    const docRef = doc(db, "users", `${user.email}`);
    const payload = {
      'id': user.uid,
      'email': user.email,
      'startSession': null,
      'accessToken': null
    }

    await setDoc(docRef, payload)

    const subscriptionsCollection = collection(docRef, "subscriptionsCollection");
    const timerCollection = collection(docRef, "timerCollection")

    await setDoc(doc(subscriptionsCollection, "subscriptions"), { 'steel': null, 'beam': null, 'pad': null });
    await setDoc(doc(subscriptionsCollection, "subscriptionsTime"), { 'steel': 30, 'beam': 30, 'pad': 30 });
    await setDoc(doc(timerCollection, "timer"), {});
  }


  //Authentication handlers -START


  const loginHandler = (enteredEmail, enteredPassword) => {

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(() => {
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

        sendEmailVerification(auth.currentUser)
          .then(() => {
            setSendEmailInfo(true)
            newUser(userCredential.user)
          })


        setRegistrationSucces(false)
        setLoginSucces(false)
        signOut(auth)

      })
      .catch((error) => {
        setRegistrationSucces(error)
      });


  }

  //Authentication handlers -END


  useEffect(() => {

    const docPath = `users/${userDocumentName}`

    const docRef = doc(db, docPath);

    const storedUserLoggedInformation = onAuthStateChanged(auth, (user) => {

      if (user) {

        if (user.emailVerified) {
          setIsLoggedIn(user)
          console.log(user)
        } else {
          setIsLoggedIn(false)
          signOut(auth)
        }

      } else {
        setIsLoggedIn(false)

      }
    })

    return () => storedUserLoggedInformation()
  }, [])

  // serverTimestamp & accessToken in Firebase
  useEffect(() => {
    const docPath_timer = `users/${userDocumentName}/timerCollection/timer`

    const docRef_timer = doc(db, docPath_timer);


    let lastSessionTime
    getDoc(docRef_timer)
      .then(docSnap => {
        if (docSnap.exists()) {
          lastSessionTime = docSnap.data().timeSession

        }
        const timeToLastSession = lastSessionTime && ((new Date).getTime() - lastSessionTime.toDate().getTime()) / 60000 // minutes


        const docPath_main = `users/${userDocumentName}`

        const docRef_main = doc(db, docPath_main);

        getDoc(docRef_main)
          .then(docSnap => {

            if (docSnap.exists() && docSnap.data().accessToken === isLoggedIn.accessToken) {

              updateDoc(doc(db, "users", userDocumentName), {
                'startSession': serverTimestamp()
              })
            } else if (docSnap.exists() && !docSnap.data().startSession || timeToLastSession > 30) {

              updateDoc(doc(db, "users", userDocumentName), {
                'accessToken': isLoggedIn.accessToken,
                'startSession': serverTimestamp()
              })

            } else if (isLoggedIn.accessToken == undefined) {
            } else {
              setIsLoggedIn(false)
              signOut(auth)
            }
          })
      })
  }, [userDocumentName, isLoggedIn])



  // setSubscriptions

  useEffect(() => {

    if (isLoggedIn) {
      onSnapshot(doc(db, "users", `${userDocumentName}/subscriptionsCollection/subscriptions`), (doc) => {
        const userSubscriptions = doc.data() ? doc.data() : false
        setSubscriptions(userSubscriptions)
      });

      onSnapshot(doc(db, "users", `${userDocumentName}/subscriptionsCollection/subscriptionsTime`), (doc) => {
        const userSubscriptionsTime = doc.data() ? doc.data() : false
        setSubscriptionsTime(userSubscriptionsTime)
      });
    }
  }, [userDocumentName, isLoggedIn])


  //setLoginTime+setSessionTime

  useEffect(() => {
    if (isLoggedIn) {
      onSnapshot(doc(db, "users", userDocumentName), (doc) => {

        const startSessionTimestamp = doc.data().startSession ? doc.data().startSession : 0
        if (startSessionTimestamp) {
          setLoginTime(startSessionTimestamp)
          setSessionTime(startSessionTimestamp.toDate().getTime())
        }

      });
    }
  }, [userDocumentName, isLoggedIn])

  //timer of session
  useEffect(() => {

    if (isLoggedIn && loginTime) {
      let timeSession = loginTime.toDate().getTime()
      const timeUpdate = 10 //s
      let t = 0

      const timer = setInterval(() => {
        t += 1

        timeSession = timeSession > 0 ? timeSession + 1000 : null

        if (t % timeUpdate === 0) {
          updateDoc(doc(db, "users", `${userDocumentName}/timerCollection/timer`), {
            'timeSession': new Date(timeSession)
          })
          setSessionTime(timeSession)

        }
        console.log(timeSession)
      }, 1000)
      return () => clearInterval(timer)
    }

  }, [loginTime, isLoggedIn])



  const beamDesignHandler = () => {
    setButtonClicked(true)                         //rozmycie buttonów
    setTimeout(() => { setHide(true) }, 600)          //usunięcie komponentu IntroButtons
    setTimeout(() => { setBeamClicked(true) }, 1400)  //dodanie komponentu BeamDesign
  }


  const ctxValue = {
    onSetSendEmailInfo: setSendEmailInfo,
    onSetLoginSucces: setLoginSucces,
    onSetRegistrationSucces: setRegistrationSucces,
    onLoginHandler: loginHandler,
    onRegisterHandler: registerHandler,
    onBeamDesignHandler: beamDesignHandler,
    setIsLoggedIn: setIsLoggedIn,
    setButtonClicked: setButtonClicked,
    setHide: setHide,
    setBeamClicked: setBeamClicked,

    sendEmailInfo: sendEmailInfo,
    loginSucces: loginSucces,
    registrationSucces: registrationSucces,
    userDocumentName: userDocumentName,
    subscriptions: subscriptions,
    buttonClicked: buttonClicked,
    sessionTime: sessionTime,
    subscriptionsTime: subscriptionsTime,
    isLoggedIn: isLoggedIn,
  }


  return (
    <CartContext.Provider value={ctxValue}>
      <div className={`${styles.container} ${hide && styles.fullscreen}`}>

        {!isLoggedIn ? (<Login />) : (!hide && (<IntroButtons />))}

        {beamClicked && <BeamDesign />}
      </div>

      {isLoggedIn && <Navigation />}

    </CartContext.Provider>
  )
}

export default App;
