import Home from '@/pages/Home';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';
import NotFound from '@/pages/NotFound';
import SignUp from '@/pages/SignUp';

export const routes = [
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: '/home',
    element: <Home />,
  },

  {
    path: 'mypage',
    element: <MyPage />,
  },
];
