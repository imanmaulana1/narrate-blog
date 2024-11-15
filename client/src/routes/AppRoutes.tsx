import { createBrowserRouter } from 'react-router-dom';

import { PublicRoutes, PrivateRoutes } from '@/routes/ProtectedRoutes';
import RootLayout from '@/layouts/RootLayout';
import UserLayout from '@/layouts/UserLayout';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
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
        path: ':username',
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <div>Profile Page</div>,
          },
          {
            path: 'settings',
            element: <PrivateRoutes />,
            children: [
              {
                index: true,
                element: <div>Settings Page</div>,
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
