// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'; // Cloud firestore 데이터가져오기
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqfuAwhPrmv_2jkM-4OQ0XKdkQW6CX9_Q",
  authDomain: "mate6-7153e.firebaseapp.com",
  projectId: "mate6-7153e",
  storageBucket: "mate6-7153e.appspot.com",
  messagingSenderId: "144043087464",
  appId: "1:144043087464:web:3e12120c5ef4152f548ddd",
  measurementId: "G-S2L9Z3D5EQ"
};

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

// Create a root reference
const storage = getStorage();