import {
  getDetailPost,
  getPosts,
  recommendPosts,
} from '@/services/api/postService';
import { PostDetailResponse, PostResponse } from '@/types/api/posts';
import { ApiErrorResponse } from '@/types/global';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const usePosts = (page = 1, sort = 'createdAt', order = 'asc') => {
  const { data, isLoading, isError, error } = useQuery<
    PostResponse,
    ApiErrorResponse
  >({
    queryKey: ['posts', { page, sort, order }],
    queryFn: () => getPosts({ page, sort, order }),
    placeholderData: keepPreviousData,
  });

  return { data, isLoading, isError, error };
};

const useRecommendedPosts = () => {
  const { data, isLoading, isError, error } = useQuery<
    PostResponse,
    ApiErrorResponse
  >({
    queryKey: ['recommendedPosts'],
    queryFn: recommendPosts,
    placeholderData: keepPreviousData,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 48 * 60 * 60 * 1000,
  });

  return { data, isLoading, isError, error };
};

const useDetailPost = (slug: string) => {
  const { data, isLoading, isError, error } = useQuery<
    PostDetailResponse,
    ApiErrorResponse
  >({
    queryKey: ['detailPost', slug],
    queryFn: () => getDetailPost(slug),
    enabled: !!slug,
  });

  return { data, isLoading, isError, error };
};

export { usePosts, useRecommendedPosts, useDetailPost };
