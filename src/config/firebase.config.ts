import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

// firebase configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "telegram-web-app-7f668.firebaseapp.com",
  projectId: "telegram-web-app-7f668",
  storageBucket: "telegram-web-app-7f668.appspot.com",
  messagingSenderId: "367614671098",
  appId: "1:367614671098:web:22c3c866eca551ad47f143",
  measurementId: "G-XP8CZ9S0EQ",
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
