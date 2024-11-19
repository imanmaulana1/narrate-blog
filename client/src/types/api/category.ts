import { ApiResponse } from '../global';
import { Post } from './posts';

export type Category = {
  id: string;
  name: string;
  slug: string;
  posts?: Post[];
};

export type CategoryResponseData = {
  data: Category[];
};

export type CategoryDetailResponseData = {
  data: Category;
};

export type CategoriesResponse = ApiResponse<CategoryResponseData>;

export type CategoryDetailResponse = ApiResponse<CategoryDetailResponseData>;
