import { getPosts } from '@/services/api/postService';
import { PostResponse } from '@/types/api/posts';
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

export { usePosts };
