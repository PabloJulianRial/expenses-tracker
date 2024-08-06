import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH-NG99iZqF8OYYrJvATODie2uWwIdZ9w",
  authDomain: "expense-tracker-f4e77.firebaseapp.com",
  projectId: "expense-tracker-f4e77",
  storageBucket: "expense-tracker-f4e77.appspot.com",
  messagingSenderId: "470717212513",
  appId: "1:470717212513:web:e32d389a3fbff29b5b4720",
  measurementId: "G-S010S46Q9D",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
