import isAuthenticated from '@/lib/privateRouteHandler';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to='/' />;
};

export const PrivateRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' />;
};
