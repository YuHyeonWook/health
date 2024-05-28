import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCTHTRKxdRHshjEsZ2jt0m9jmcrO9QKhSM',
  authDomain: 'toy2-abff4.firebaseapp.com',
  projectId: 'toy2-abff4',
  storageBucket: 'toy2-abff4.appspot.com',
  messagingSenderId: '690501479513',
  appId: '1:690501479513:web:3268869662344392e0d548',
  measurementId: 'G-8YNJSL2EFE',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
