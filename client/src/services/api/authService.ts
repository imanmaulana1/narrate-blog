import { api } from '@/lib/axiosInstance';
import handleApiError from '@/lib/apiErrorHandler';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
} from '@/types/api/user';

export const register = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  try {
    return await api.post('/auth/register', data);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    return await api.post('/auth/login', data);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};
