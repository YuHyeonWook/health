import Home from '@/pages/Home';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';
import NotFound from '@/pages/NotFound';
import Calendar from '@/pages/Calendar';
import ApplyForm from '@/pages/ApplyForm';

export const routes = [
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound />,
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
  {
    path: '/apply',
    element: <ApplyForm />,
  },
];