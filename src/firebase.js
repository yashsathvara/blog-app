// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-oLSUOLQQ6HEoXG6s5PFIG0V9KUV1kKs",
  authDomain: "blog-dm-c17cb.firebaseapp.com",
  databaseURL:
    "https://blog-dm-c17cb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blog-dm-c17cb",
  storageBucket: "blog-dm-c17cb.appspot.com",
  messagingSenderId: "134197323086",
  appId: "1:134197323086:web:e79106867ad93f792aaa1f",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
