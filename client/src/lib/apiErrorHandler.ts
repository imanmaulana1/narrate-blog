import { ApiErrorResponse } from '@/types/global';
import { AxiosError } from 'axios';

const handleApiError = (error: unknown): ApiErrorResponse => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const apiError = error.response.data;
      return {
        message: apiError.message || 'Internal Server Error',
        success: apiError.success || false,
        errors: apiError.errors,
      };
    }

    if (error.request) {
      return {
        message: 'Cannot connect to server',
      };
    }
  }

  return {
    message: 'Unknown error occurred',
  };
};

export default handleApiError;
