import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGrnXhgeZpwPVA3-y0UN8UnqvZt_48nMw",
  authDomain: "trendrix-54.firebaseapp.com",
  projectId: "trendrix-54",
  storageBucket: "trendrix-54.firebasestorage.app",
  messagingSenderId: "739868376692",
  appId: "1:739868376692:web:65429fb612076cc64b5b21",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };