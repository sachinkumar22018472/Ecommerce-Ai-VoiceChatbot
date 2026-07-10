import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-d3a39.firebaseapp.com",
  projectId: "loginonecart-d3a39",
  storageBucket: "loginonecart-d3a39.firebasestorage.app",
  messagingSenderId: "562442605605",
  appId: "1:562442605605:web:5ac65e5bf7ee1984409bcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()


export {auth, provider}