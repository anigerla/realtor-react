// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUBgplR3PAjqXmF4Y1SEczJSjGR5lHq9I",
  authDomain: "realtor-clone-react-13f95.firebaseapp.com",
  projectId: "realtor-clone-react-13f95",
  storageBucket: "realtor-clone-react-13f95.appspot.com",
  messagingSenderId: "717339062423",
  appId: "1:717339062423:web:2a27bdd1ec3d2c17d4b9d2"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()