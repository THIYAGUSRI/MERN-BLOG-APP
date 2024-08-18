// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ce936.firebaseapp.com",
  projectId: "mern-blog-ce936",
  storageBucket: "mern-blog-ce936.appspot.com",
  messagingSenderId: "963271615210",
  appId: "1:963271615210:web:3bfcf3218e24fe75be6d93"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);