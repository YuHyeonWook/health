import { auth } from '@/firebase';
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate('/');
      console.log('로그인 성공');
      console.log('result:', result.user);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };
  return (
    <div>
      <button onClick={handleGoogleLogin}>로그인</button>
    </div>
  );
};

export default Login;
