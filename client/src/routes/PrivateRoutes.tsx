import isAuthenticated from '@/lib/privateRouteHandler';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
