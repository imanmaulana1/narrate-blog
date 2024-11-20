import {
  getCategories,
  getCategoryBySlug,
} from '@/services/api/categoryService';
import {
  CategoriesResponse,
  CategoryDetailResponse,
} from '@/types/api/category';
import { ApiErrorResponse } from '@/types/global';
import { useQuery } from '@tanstack/react-query';

const useCategories = () => {
  const { data, isLoading } = useQuery<CategoriesResponse, ApiErrorResponse>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 48 * 60 * 60 * 1000,
  });

  return { data, isLoading };
};

const useCategory = (slug: string) => {
  const { data, isLoading } = useQuery<
    CategoryDetailResponse,
    ApiErrorResponse
  >({
    queryKey: ['category', slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 48 * 60 * 60 * 1000,
  });

  return { data, isLoading };
};

export { useCategories, useCategory };
