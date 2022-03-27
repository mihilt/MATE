// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'; // Cloud firestore 데이터가져오기
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: "AIzaSyBakSuFILQkCyi7FdlIfKZOPGMgiM6dStI",
  // authDomain: "matebeta-b1982.firebaseapp.com",
  // projectId: "matebeta-b1982",
  // storageBucket: "matebeta-b1982.appspot.com",
  // messagingSenderId: "78752793676",
  // appId: "1:78752793676:web:dc4ccfbb66f66e396020e9",
  // measurementId: "G-W8DGEFS8J0"
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