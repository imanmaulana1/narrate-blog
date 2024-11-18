import { DecodedToken } from '@/types/global';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const useAuthUser = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded);
    } catch (error) {
      console.log('Invalid token:', error);
      setUser(null);
    }
  }, []);

  return user;
};

export default useAuthUser;
