import { jwtDecode } from 'jwt-decode';
import isAuthenticated from '@/lib/privateRouteHandler';
import { Navigate, Outlet } from 'react-router-dom';
import { DecodedToken } from '@/types/global';
import { toast } from '@/hooks/use-toast';

export const PublicRoutes = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to='/' />;
};

const isTokenExpired = () : boolean => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return true;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

export const PrivateRoutes = () => {
  if (isAuthenticated()) {
    if (!isTokenExpired()) {
      console.log('hai');
      return <Outlet />;
    } else {
      localStorage.removeItem('authToken');
      toast({
        title: 'Session Expired',
        description: 'Please login again to continue.',
      });
      return <Navigate to='/login' />;
    }
  } else {
    return <Navigate to='/login' />;
  }
};
