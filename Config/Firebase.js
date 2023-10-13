//import * as firebase from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSxUMbcWS_43mWYFVTx_lpz98pA-w_7h0",
    authDomain: "myinex-platform.firebaseapp.com",
    projectId: "myinex-platform",
    storageBucket: "myinex-platform.appspot.com",
    messagingSenderId: "193597155636",
    appId: "1:193597155636:web:3a3b3f249a3005c5069d61",
    measurementId: "G-DPTV2K5VV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

console.log(app.name);  // "[DEFAULT]"
//console.log(app.options.appId);  // "[DEFAULT]"

export { app, auth, db };