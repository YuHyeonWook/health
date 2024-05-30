import Home from '@/pages/Home';
import MyPage from '@/pages/MyPage';
import NotFound from '@/pages/NotFound';
import Calendar from '@/pages/Calendar';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

export const routes = [
  {
    path: '/',
    element: <SignIn />,
    errorElement: <NotFound />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/calendar',
    element: <Calendar />,
    errorElement: <NotFound />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
];
