// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'; // Cloud firestore 데이터가져오기
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDviaQxFWGiI_wcz4yZ-dq5J-qgUobKym8",
    authDomain: "mate-test-c3a0e.firebaseapp.com",
    projectId: "mate-test-c3a0e",
    storageBucket: "mate-test-c3a0e.appspot.com",
    messagingSenderId: "117146530551",
    appId: "1:117146530551:web:45da2eab974f27f589d9f2",
    measurementId: "G-LHF2CVB0R2"
  };

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);