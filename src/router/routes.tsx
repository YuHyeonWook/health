import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import SignUp from '@/pages/SignUp';

export const routes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
];
