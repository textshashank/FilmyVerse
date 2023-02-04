
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAF7fP2joOEbG5bUCXVFeEpvWo8fg3XK4k",
  authDomain: "filmyverse-e9980.firebaseapp.com",
  projectId: "filmyverse-e9980",
  storageBucket: "filmyverse-e9980.appspot.com",
  messagingSenderId: "615572196728",
  appId: "1:615572196728:web:8d75decf577a90afc6cc8d"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesref = collection(db, "movies");
export const reviewsref = collection(db, "reviews");
export const usersref = collection(db, "users");

export default app;