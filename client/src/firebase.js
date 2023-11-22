// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEAPIKEY,
  authDomain: "real-estate-81f0e.firebaseapp.com",
  projectId: "real-estate-81f0e",
  storageBucket: "real-estate-81f0e.appspot.com",
  messagingSenderId: "240985825766",
  appId: "1:240985825766:web:a61659dec4cf92ecc53627",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
