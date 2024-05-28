import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginOut = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.log('로그아웃 실패:', error);
    }
  };

  return <button onClick={handleLogOut}>logout</button>;
};

export default LoginOut;
