import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

// firebase configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "telegram-clone-dev.firebaseapp.com",
  projectId: "telegram-clone-dev",
  storageBucket: "telegram-clone-dev.firebasestorage.app",
  messagingSenderId: "277458868452",
  appId: "1:277458868452:web:24c6296acf19f51aab74f1",
};
// init app
const app = initializeApp(firebaseConfig);

// init services
const auth = getAuth(app);

// connect to local emulators
if (import.meta.env.DEV) {
  // connectAuthEmulator(auth, "");
}

// export services
export { auth };
