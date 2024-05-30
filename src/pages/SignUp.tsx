import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import bgLogin from '@/assets/images/bg-login.png';
import logo from '@/assets/images/logo.png';
import { BgLoginImg, LogoImg, SignForm, SignSection } from '@/styles/commonSignStyle';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }

    // 비밀번호 강도 검사 (예: 최소 6자, 숫자 포함 등)
    if (password.length < 8 || !/\d/.test(password)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 하며, 숫자를 포함해야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      <BgLoginImg src={bgLogin} alt="회원가입 화면 이미지" />
      <SignForm onSubmit={handleSignUp}>
        <SignSection>
          <LogoImg src={logo} alt="로고 이미지" />
          <h2>회원가입</h2>
          <label htmlFor="email">
            이메일(아이디)
            <input
              type="email"
              placeholder="이메일(아이디)을 입력하세요"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError('');
              }}
              required
            />
          </label>
          {error && <p>{error}</p>}
          <label htmlFor="password">
            비밀번호
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError('');
              }}
              required
            />
          </label>
          {passwordError && <p>{passwordError}</p>}
          <label htmlFor="password">
            비밀번호 확인
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setPasswordError('');
              }}
              required
            />
          </label>
          {passwordError && <p>{passwordError}</p>}
          <button type="submit">회원가입</button>
        </SignSection>
      </SignForm>
    </>
  );
};

export default SignUp;
