/* eslint-disable no-unused-vars */

import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDcMoujwqn4fUDa4qygz0imPj8jGM4M2xs',
  authDomain: 'fir-library-95ef1.firebaseapp.com',
  projectId: 'fir-library-95ef1',
  storageBucket: 'fir-library-95ef1.appspot.com',
  messagingSenderId: '960681663353',
  appId: '1:960681663353:web:5aaccf62424dde69b46da8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();
