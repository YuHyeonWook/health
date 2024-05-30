import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bgLogin from '@/assets/images/bg-login.png';

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  height: auto;
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
      <img src={bgLogin} alt="회원가입 화면 이미지" />
      <h2>회원가입</h2>
      <SignUpForm onSubmit={handleSignUp}>
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
        <button type="submit">회원가입하기</button>
      </SignUpForm>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
