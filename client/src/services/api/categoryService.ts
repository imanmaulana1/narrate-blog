import handleApiError from '@/lib/apiErrorHandler';
import { api } from '@/lib/axiosInstance';
import { CategoriesResponse, Category } from '@/types/api/category';

export const getCategories = async (): Promise<CategoriesResponse> => {
  try {
    const { data } = await api.get(`/categories`);
    return data;
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};

export const getCategory = async (slug: string): Promise<Category> => {
  try {
    return await api.get(`/categories/${slug}`);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};
