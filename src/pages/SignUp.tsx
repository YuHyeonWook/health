import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">회원가입</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
