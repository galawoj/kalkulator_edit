// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtHbStF6HzcGhuhQNgdGmC7l6xjeMD198",
  authDomain: "calculator-2aa23.firebaseapp.com",
  projectId: "calculator-2aa23",
  storageBucket: "calculator-2aa23.appspot.com",
  messagingSenderId: "377940531546",
  appId: "1:377940531546:web:66fa2c776434d59011fb63",
  measurementId: "G-C4QRK6H317"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);