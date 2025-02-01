// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the modular Firebase Auth
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApeajaVlP5u6_HMzYKBtMlvOJh8-inMvw",
  authDomain: "chromiummelt.firebaseapp.com",
  projectId: "chromiummelt",
  storageBucket: "chromiummelt.firebasestorage.app",
  messagingSenderId: "15349471632",
  appId: "1:15349471632:web:b53f62c8818d88f59bbb15",
  measurementId: "G-F21QFJCBTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth using the new modular API
const db = getFirestore(app);
export { auth , db }; // Export the auth instance to be used in your app
