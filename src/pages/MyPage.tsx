import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

const MyPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <h2>My Page</h2>
      {user ? (
        <>
          <p>Email: {user.email}</p>
          <p>Display Name: {user.displayName}</p>
          <img src={user.photoURL || ''} alt="User Profile" />
        </>
      ) : (
        <p>로그인하지 않았습니다.</p>
      )}
    </div>
  );
};

export default MyPage;
