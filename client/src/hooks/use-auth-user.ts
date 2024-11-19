import AuthContext from '@/contexts/currentUser';
import { useContext } from 'react';

export const useAuthUser = () => {
  return useContext(AuthContext);
};
