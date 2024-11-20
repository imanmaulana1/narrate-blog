import handleApiError from '@/lib/apiErrorHandler';
import { api } from '@/lib/axiosInstance';
import {
  CategoriesResponse,
  CategoryDetailResponse,
} from '@/types/api/category';

export const getCategories = async (): Promise<CategoriesResponse> => {
  try {
    return await api.get(`/categories`);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};

export const getCategoryBySlug = async (
  slug: string
): Promise<CategoryDetailResponse> => {
  try {
    return await api.get(`/categories/${slug}`);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};
