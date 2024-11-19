import handleApiError from '@/lib/apiErrorHandler';
import { api } from '@/lib/axiosInstance';
import { GetPostsParams, PostResponse } from '@/types/api/posts';

export const getPosts = async ({
  page,
  sort,
  order,
}: GetPostsParams): Promise<PostResponse> => {
  const pageNo = page || 1;
  try {
    return await api.get(`/posts?page=${pageNo}&sort=${sort}&order=${order}`);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};
