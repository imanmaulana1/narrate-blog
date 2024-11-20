import handleApiError from '@/lib/apiErrorHandler';
import { api } from '@/lib/axiosInstance';
import { UsersResponse } from '@/types/api/user';

export const getUsers = async (): Promise<UsersResponse> => {
  try {
    return await api.get('/users');
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};
