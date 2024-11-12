// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkTrl76qbMN_kBOgjLJmXen-reR5Eww0U",
  authDomain: "kitchen-207dd.firebaseapp.com",
  projectId: "kitchen-207dd",
  storageBucket: "kitchen-207dd.appspot.com",
  messagingSenderId: "872649771407",
  appId: "1:872649771407:web:ef30aadb63a7b27476e3fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);