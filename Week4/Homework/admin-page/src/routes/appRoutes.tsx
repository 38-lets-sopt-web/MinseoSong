import { createBrowserRouter, Navigate } from 'react-router-dom';
import MyPageLayout from '@/layouts/MyPageLayout';
import LoginPage from '@/pages/LoginPage';
import ProfilePage from '@/pages/ProfilePage';
import SignupPage from '@/pages/SignupPage';
import UserDetailPage from '@/pages/UserDetailPage';
import UsersPage from '@/pages/UsersPage';
import ProtectedRoute from '@/routes/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/mypage',
        element: <MyPageLayout />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'users/:userId',
            element: <UserDetailPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="/" />,
  },
]);
