// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB37M0D9aKDymwSXt_GY-DblzRlMky8dJw",
  authDomain: "artflow-app-477a0.firebaseapp.com",
  projectId: "artflow-app-477a0",
  storageBucket: "artflow-app-477a0.firebasestorage.app",
  messagingSenderId: "755917321436",
  appId: "1:755917321436:web:0b9562bd04e5660a62b019",
  measurementId: "G-C5WNG1iD7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
