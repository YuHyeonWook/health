import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import LoginOut from '@/components/LoginOut';

const MyPage = () => {
  const [user, setUser] = useState<User | null>(null);
  console.log(user);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  });

  return (
    <div>
      <LoginOut />
      <h2>My Page</h2>
      {user ? (
        <>
          <img src={user.photoURL || ''} alt="User Profile" />
          <p>Email: {user.email}</p>
          <p>이름: {user.displayName}</p>
        </>
      ) : (
        <p>로그인하지 않았습니다.</p>
      )}
    </div>
  );
};

export default MyPage;
