import React, { useState, useEffect,createContext, useContext } from 'react';


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

import { auth, db } from '../firebase';



export const CartContext = createContext({
    onSetSendEmailInfo: ()=>{},	
    onSetLoginSucces: ()=>{},		
    onSetRegistrationSucces: ()=>{},		
    setIsLoggedIn: ()=>{},		
    setIntroButtonClicked: ()=>{},		
    setIntroHide: ()=>{},	
    setBeamClicked: ()=>{},		
    onLoginHandler:()=>{},			
    onRegisterHandler:()=>{},	
    onBeamDesignHandler:()=>{},	

    beamClicked:{},
    introHide:{},
    sendEmailInfo: {},		
    loginSucces:{},	
    registrationSucces:{},		
    userDocumentName:{},		
    subscriptions:{},		
    introButtonClicked:{},		
    sessionTime:{},		
    subscriptionsTime:{},		
    isLoggedIn:{},	
    waitingForRegistration: {}
});



export default function ContextProvider ({children}) {


        const [beamClicked, setBeamClicked] = useState(false)
        const [introHide, setIntroHide] = useState(false)
        const [introButtonClicked, setIntroButtonClicked] = useState(false)
        const [loginSucces, setLoginSucces] = useState(false)
        const [registrationSucces, setRegistrationSucces] = useState(false)
        const [isLoggedIn, setIsLoggedIn] = useState(false)
        const [subscriptions, setSubscriptions] = useState(false)
        const [subscriptionsTime, setSubscriptionsTime] = useState(false)
        const [loginTime, setLoginTime] = useState(false)
        const [sessionTime, setSessionTime] = useState(false)
        const [sendEmailInfo, setSendEmailInfo] = useState(false)
        const [waitingForRegistration,setWaitingForRegistration] = useState(false)

      
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
          setWaitingForRegistration(true)
          createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
            .then((userCredential) => {
      
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  setWaitingForRegistration(false)
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
          setIntroButtonClicked(true)                         //blur buttons
          setTimeout(() => { setIntroHide(true) }, 600)          //hide component Intro
          setTimeout(() => { setBeamClicked(true) }, 1400)  //visible component BeamDesign
        }
      
      
        const ctxValue = {
          onSetSendEmailInfo: setSendEmailInfo,
          onSetLoginSucces: setLoginSucces,
          onSetRegistrationSucces: setRegistrationSucces,
          onLoginHandler: loginHandler,
          onRegisterHandler: registerHandler,
          onBeamDesignHandler: beamDesignHandler,
          setIsLoggedIn: setIsLoggedIn,
          setIntroButtonClicked: setIntroButtonClicked,
          setIntroHide: setIntroHide,
          setBeamClicked: setBeamClicked,
      
          beamClicked:beamClicked,
          introHide:introHide,
          sendEmailInfo: sendEmailInfo,
          loginSucces: loginSucces,
          registrationSucces: registrationSucces,
          userDocumentName: userDocumentName,
          subscriptions: subscriptions,
          introButtonClicked: introButtonClicked,
          sessionTime: sessionTime,
          subscriptionsTime: subscriptionsTime,
          isLoggedIn: isLoggedIn,
          waitingForRegistration:waitingForRegistration
        }
      


return <CartContext.Provider value={ctxValue}>
    {children}
</CartContext.Provider>

}

