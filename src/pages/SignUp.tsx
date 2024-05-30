import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bgLogin from '@/assets/images/bg-login.png';
import logo from '@/assets/images/logo.png';

const SignForm = styled.form`
  display: flex;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);

  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
`;

const SignSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  border: 1px solid var(--color-white);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 20rem;
  height: 80%;
`;

const BgLoginImg = styled.img`
  position: relative;
`;

const LogoImg = styled.img`
  width: 8rem;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <BgLoginImg src={bgLogin} alt="회원가입 화면 이미지" />
      <SignForm onSubmit={handleSignUp}>
        <SignSection>
          <LogoImg src={logo} alt="로고 이미지" />
          <h3>회원가입</h3>
          <input type="email" placeholder="이메일" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <button type="submit">회원가입</button>
        </SignSection>
      </SignForm>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
