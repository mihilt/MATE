// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'; // Cloud firestore 데이터가져오기
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBakSuFILQkCyi7FdlIfKZOPGMgiM6dStI",
  authDomain: "matebeta-b1982.firebaseapp.com",
  projectId: "matebeta-b1982",
  storageBucket: "matebeta-b1982.appspot.com",
  messagingSenderId: "78752793676",
  appId: "1:78752793676:web:dc4ccfbb66f66e396020e9",
  measurementId: "G-W8DGEFS8J0"
};

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);