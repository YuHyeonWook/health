import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoutBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.1rem;
  color: #4cd964;
`;

const LoginOut = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      // localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.log('로그아웃 실패:', error);
    }
  };

  return <LogoutBtn onClick={handleLogOut}>로그아웃</LogoutBtn>;
};

export default LoginOut;
