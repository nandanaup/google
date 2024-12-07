// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd6xzkiCn9PtwSiwz7huFAfU4lmeefpfs",
  authDomain: "react-firebase-caa2c.firebaseapp.com",
  projectId: "react-firebase-caa2c",
  storageBucket: "react-firebase-caa2c.firebasestorage.app",
  messagingSenderId: "562443568380",
  appId: "1:562443568380:web:ffb482daa416dc066d8379",
  measurementId: "G-DBSG5H1PQV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
