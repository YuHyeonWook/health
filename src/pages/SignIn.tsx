import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const routeChange = () => {
    navigate('/signup');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인에 성공하였습니다.');
      navigate('/calendar');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <button onClick={routeChange}>회원가입</button>
      <form onSubmit={handleSignIn}>
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">로그인</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignIn;

// import { auth } from '@/firebase';
// import { userState } from '@/recoil/userState';
// import { FirebaseError } from 'firebase/app';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { useSetRecoilState } from 'recoil';

// const Login = () => {
//   const navigate = useNavigate();
//   const setUser = useSetRecoilState(userState);

//   const handleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       if (credential) {
//         const token = credential.accessToken;
//         const userInfo = result.user;
//         console.log('User Info:', userInfo);
//         console.log('Token:', token);
//         setUser(userInfo);
//         localStorage.setItem('user', JSON.stringify(userInfo));

//         const phoneNumber = localStorage.getItem('phoneNumber') || '';
//         const birthdate = localStorage.getItem('birthdate') || '';

//         // 전화번호와 생년월일 정보 업데이트 (Firebase Realtime Database 또는 다른 저장소)
//         await updateUserInfo(userInfo.uid, phoneNumber, birthdate);
//         navigate('/calendar');
//       } else {
//         console.error('No credential found');
//       }
//     } catch (error) {
//       if (error instanceof FirebaseError) {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         let email;
//         if (error.customData) {
//           email = error.customData.email;
//         }
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         console.error('Error during sign in:', errorCode, errorMessage, email, credential);
//       } else {
//         console.error('Error during sign in:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;
