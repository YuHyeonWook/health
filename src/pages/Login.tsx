import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase';
import googleImage from '@/assets/images/googleImage.png';
import styled from 'styled-components';

const StyledGoogleLoginImg = styled.img`
  width: 100%;
  height: 4rem;
`;

const StyledGoogleLoginBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const providerGoogle = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handleGithubLogin = async () => {
    const providerGithub = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, providerGithub);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <>
      <h1>로그인</h1>
      <StyledGoogleLoginBtn onClick={handleGoogleLogin}>
        <StyledGoogleLoginImg src={googleImage} alt="Google 로그인" />
      </StyledGoogleLoginBtn>
      <button onClick={handleGithubLogin}>Github 로그인</button>
    </>
  );
};

export default Login;
