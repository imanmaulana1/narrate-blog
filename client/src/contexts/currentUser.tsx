import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/types/global';

const AuthContext = createContext<DecodedToken | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const isExpired = decoded.exp && decoded.exp * 1000 < Date.now();
        if (!isExpired) {
          setUser(decoded);
        } else {
          localStorage.removeItem('authToken');
        }
      } catch {
        setUser(null);
      }
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthContext;
