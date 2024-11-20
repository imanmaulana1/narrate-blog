import AuthContext from '@/contexts/currentUser';
import { useContext } from 'react';

export const useAuthUser = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthUser must be used within an AuthProvider');
  }

  return context;
};
