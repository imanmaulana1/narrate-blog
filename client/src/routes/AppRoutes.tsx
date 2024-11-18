import { createBrowserRouter } from 'react-router-dom';

import { PublicRoutes, PrivateRoutes } from '@/routes/ProtectedRoutes';
import RootLayout from '@/layouts/RootLayout';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import SettingLayout from '@/layouts/SettingLayout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage';
import PostPage from '@/pages/PostPage';
import CreatePostPage from '@/pages/CreatePostPage';

const routes = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'category/:categorySlug',
            element: <div>Category Page</div>,
          },
          {
            path: 'search',
            element: <div>Search Page</div>,
          },
          {
            path: ':username',
            element: <div>Profile Page</div>,
          },
        ],
      },
      {
        path: 'new-post',
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            element: <CreatePostPage />,
          },
        ],
      },
      {
        path: 'post/:postSlug',
        element: <PostPage />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: 'settings',
            element: <SettingLayout />,
            children: [
              {
                index: true,
                element: <div>Profile Page</div>,
              },
              {
                path: 'profile',
                element: <div>Profile Page</div>,
              },
              {
                path: 'customization',
                element: <div>Customization Page</div>,
              },
              {
                path: 'account',
                element: <div>Account Page</div>,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'register',
        element: <PublicRoutes />,
        children: [
          {
            index: true,
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: 'login',
        element: <PublicRoutes />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
