import { lazy, Suspense } from 'react';
import Loading from '@/pages/Loading';
import ProtectedRoute from './ProtectedRoute';

const MyPage = lazy(() => import('@/pages/MyPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Calendar = lazy(() => import('@/pages/Calendar'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const ApplyForm = lazy(() => import('@/pages/ApplyForm'));
const ApplyList = lazy(() => import('@/pages/ApplyList'));

export const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <SignIn />,
      </Suspense>
    ),
  },
  {
    path: '/signup',
    element: (
      <Suspense fallback={<Loading />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: '/calendar',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <Calendar />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/mypage',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <MyPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/apply',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <ApplyForm />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/applyList',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <ApplyList />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
