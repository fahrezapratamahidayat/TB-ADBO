// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJcbcPQ8BENZrVGsGgQE_8x1RiV6DuqEg",
  authDomain: "next-app-52f76.firebaseapp.com",
  projectId: "next-app-52f76",
  storageBucket: "next-app-52f76.appspot.com",
  messagingSenderId: "821903277612",
  appId: "1:821903277612:web:233b1a84456e5f2b561b89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };