import handleApiError from '@/lib/apiErrorHandler';
import { api, authApi } from '@/lib/axiosInstance';
import {
  GetPostsParams,
  LikePostResponse,
  PostDetailResponse,
  PostResponse,
} from '@/types/api/posts';

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

export const recommendPosts = async (): Promise<PostResponse> => {
  try {
    return await api.get('/posts/random');
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};

export const getDetailPost = async (
  slug: string
): Promise<PostDetailResponse> => {
  try {
    return await api.get(`/posts/${slug}`);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};

export const likePost = async (postId: string): Promise<LikePostResponse> => {
  try {
    return await authApi.post(`/posts/${postId}/like`);
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};
