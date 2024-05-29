import { auth } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        const userInfo = result.user;
        console.log('User Info:', userInfo);
        console.log('Token:', token);
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/calendar');
      } else {
        console.error('No credential found');
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        let email;
        if (error.customData) {
          email = error.customData.email;
        }
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error('Error during sign in:', errorCode, errorMessage, email, credential);
      } else {
        console.error('Error during sign in:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
