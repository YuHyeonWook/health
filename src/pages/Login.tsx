// Login.tsx
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { auth } from '@/firebase';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user)); // 사용자 정보를 localStorage에 저장
      navigate('/home'); // /mypage 경로로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>구글 로그인</button>
    </div>
  );
};

export default Login;
