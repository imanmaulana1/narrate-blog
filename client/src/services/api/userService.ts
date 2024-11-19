import handleApiError from '@/lib/apiErrorHandler';
import { api } from '@/lib/axiosInstance';
import { UsersResponse } from '@/types/api/user';

export const getUsers = async (): Promise<UsersResponse> => {
  try {
    const { data } = await api.get('/users');
    return data;
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};
