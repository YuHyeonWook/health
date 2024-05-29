import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase';
import googleImage from '@/assets/images/googleImage.png';
import githubImage from '@/assets/images/githubImage.png';
import styled from 'styled-components';

const LoginImg = styled.img`
  width: 100%;
  height: 4rem;
`;

const LoginBtn = styled.button`
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
      navigate('/calendar');
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
      navigate('/calendar');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <>
      <h1>로그인</h1>
      <LoginBtn onClick={handleGoogleLogin}>
        <LoginImg src={googleImage} alt="Google 로그인" />
      </LoginBtn>
      <LoginBtn onClick={handleGithubLogin}>
        <LoginImg src={githubImage} alt="" />
      </LoginBtn>
    </>
  );
};

export default Login;
