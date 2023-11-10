/* eslint-disable no-unused-vars */

import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: 'fir-library-95ef1',
  storageBucket: 'fir-library-95ef1.appspot.com',
  messagingSenderId: '960681663353',
  appId: '1:960681663353:web:5aaccf62424dde69b46da8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
