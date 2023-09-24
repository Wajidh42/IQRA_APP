// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ0ly663ABv-OxzoWT8z5XY7xvph1Kdwg",
  authDomain: "iqraapp-51209.firebaseapp.com",
  projectId: "iqraapp-51209",
  storageBucket: "iqraapp-51209.appspot.com",
  messagingSenderId: "952886620219",
  appId: "1:952886620219:web:dc220285dcdb181d342c1e",
  measurementId: "G-EP9V5S2SF9",
  databaseURL: "https://iqraapp-51209-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
