import { loginData, registerData } from '@/types/global';
import { api } from '@/lib/axios';
import handleApiError from '@/lib/apiErrorHandler';

export const register = async (data: registerData) => {
  try {
    return await api.post('/auth/register', data);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};

export const login = async (data: loginData) => {
  try {
    return await api.post('/auth/login', data);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};
