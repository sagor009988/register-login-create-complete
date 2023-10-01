// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzx23X42AfdTc-oqjHFvwtOeer4gDujwk",
  authDomain: "email-password-firebase-3167c.firebaseapp.com",
  projectId: "email-password-firebase-3167c",
  storageBucket: "email-password-firebase-3167c.appspot.com",
  messagingSenderId: "281038741568",
  appId: "1:281038741568:web:eb540e2f14989b9eb6bfa5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth