// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTcXt-jsYeF9tfHPia16G8eVmmGV77Ciw",
  authDomain: "chat-app-7de56.firebaseapp.com",
  projectId: "chat-app-7de56",
  storageBucket: "chat-app-7de56.appspot.com",
  messagingSenderId: "1030752512644",
  appId: "1:1030752512644:web:570cf9609474d6bb84f0d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const userRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');