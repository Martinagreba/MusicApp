// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAllxOAIdO73Z5OeDkaVeD4qBI_aMBgR14",
  authDomain: "music-app-4fc88.firebaseapp.com",
  projectId: "music-app-4fc88",
  storageBucket: "music-app-4fc88.firebasestorage.app",
  messagingSenderId: "83042065910",
  appId: "1:83042065910:web:731f8ebd06f8e4118bbbd7",
  measurementId: "G-NWV95TJ7LB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
