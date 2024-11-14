import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
} from '@/types/global';
import { api } from '@/lib/axiosInstance';
import handleApiError from '@/lib/apiErrorHandler';
import { AxiosResponse } from 'axios';

export const register = async (
  data: RegisterData
): Promise<AxiosResponse<RegisterResponse>> => {
  try {
    return await api.post('/auth/register', data);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};

export const login = async (
  data: LoginData
): Promise<AxiosResponse<LoginResponse>> => {
  try {
    return await api.post('/auth/login', data);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};
