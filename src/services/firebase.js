// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVvApVxc8yj7C5wsFxcOdBglFla6QB8Vc",
  authDomain: "wad-aa98c.firebaseapp.com",
  databaseURL:
    "https://wad-aa98c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wad-aa98c",
  storageBucket: "wad-aa98c.appspot.com",
  messagingSenderId: "688611556730",
  appId: "1:688611556730:web:4ac6ab8c016988a6692ac3",
  measurementId: "G-YQCQ73ELLW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
const analytics = getAnalytics(app);
