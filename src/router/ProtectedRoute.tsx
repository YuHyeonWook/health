import React, { ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '@/firebase';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>로딩중...</p>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
