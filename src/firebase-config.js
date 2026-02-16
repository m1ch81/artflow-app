// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSy837M00vxKDymxSXt_D9-0o1zRMkyS8Jw",
  authDomain: "artflow-app-477a8.firebaseapp.com",
  projectId: "artflow-app-477a8",
  storageBucket: "artflow-app-477a8.appspot.com",
  messagingSenderId: "755917321436",
  appId: "1:755917321436:web:0b56526568d4626b19",
  measurementId: "G-C5MtdG1D7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
