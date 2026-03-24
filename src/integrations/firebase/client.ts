import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserSessionPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD9roRIKSeqpT9V-IeeYEDeAWGC55GwGDI",
  authDomain: "wisora-f79d4.firebaseapp.com",
  projectId: "wisora-f79d4",
  storageBucket: "wisora-f79d4.firebasestorage.app",
  messagingSenderId: "5998029275",
  appId: "1:5998029275:web:27818bd7c94248cd6d1ffe",
  measurementId: "G-3NRBJ3G403",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Use session persistence — user must log in on every fresh page load
// (no auto-login from a previously saved session)
setPersistence(auth, browserSessionPersistence);

export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics only in browser
if (typeof window !== "undefined") {
  getAnalytics(app);
}

export default app;
