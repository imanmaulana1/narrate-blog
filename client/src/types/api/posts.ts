import { ApiResponse } from '../global';
import { Category } from './category';
import { User } from './user';

export type GetPostsParams = {
  page?: number;
  sort?: string;
  order?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  author: User;
  category: Category;
  views: number;
  _count: {
    comments: number;
    likes: number;
  };
  estimated_read_time: string;
};

export type PostResponseData = {
  data: Post[];
  pagination: {
    currentPage: number;
    totalPage: number;
    totalData: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
};

type PostDetailResponseData = {
  data: Post;
};

export type PostResponse = ApiResponse<PostResponseData>;

export type PostDetailResponse = ApiResponse<PostDetailResponseData>;
