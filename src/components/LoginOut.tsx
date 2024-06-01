import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoutBtn = styled.button`
  font-size: 1.8rem;
  color: var(--color-primary);
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: var(--color-primary-dark);
  }
`;

const LoginOut = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log('로그아웃 실패:', error);
    }
  };

  return <LogoutBtn onClick={handleLogOut}>로그아웃</LogoutBtn>;
};

export default LoginOut;
