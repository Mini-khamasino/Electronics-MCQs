// ============================================================
// Firebase Configuration for MultiQuiz — Google Sign-In
// ============================================================
// HOW TO SET UP:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use existing)
// 3. Go to Authentication > Sign-in method > Enable "Google"
// 4. Add your GitHub Pages domain to Authorized domains:
//    Settings > Authorized domains > Add "mini-khamasino.github.io"
// 5. Go to Project Settings > General > Your apps > Add web app
// 6. Copy the config object and replace the placeholder below
// 7. Done! Users can now sign in with their Google account.
// ============================================================

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEyt1w6D5XWUBIXjnCwXj_1OIuUHu5RoA",
  authDomain: "reviewquestions.firebaseapp.com",
  projectId: "reviewquestions",
  storageBucket: "reviewquestions.firebasestorage.app",
  messagingSenderId: "1097960824670",
  appId: "1:1097960824670:web:5da987f8964005082279cf",
  measurementId: "G-W2RQQGB1CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
