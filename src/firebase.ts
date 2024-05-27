import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCTHTRKxdRHshjEsZ2jt0m9jmcrO9QKhSM',
  authDomain: 'toy2-abff4.firebaseapp.com',
  projectId: 'toy2-abff4',
  storageBucket: 'toy2-abff4.appspot.com',
  messagingSenderId: '690501479513',
  appId: '1:690501479513:web:be27c7fe6dda9dfbe0d548',
  measurementId: 'G-7ZYRKL79WJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
