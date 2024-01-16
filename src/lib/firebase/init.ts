// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUAmSUpw90OPyAlcSCHWKUjxv-VEYK7qk",
  authDomain: "tb-adbo.firebaseapp.com",
  projectId: "tb-adbo",
  storageBucket: "tb-adbo.appspot.com",
  messagingSenderId: "280688449805",
  appId: "1:280688449805:web:f10d8be22228d6a1f4b844"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };