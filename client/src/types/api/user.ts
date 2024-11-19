import { ApiResponse } from '@/types/global';

export type RegisterData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  credential: string; // Username atau email
  password: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  name?: string;
  bio?: string;
  avatar?: string;
  created_at: string;
  updated_at?: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: string;
};

type LoginResponseData = {
  data: User;
  token: TokenResponse;
};

type UserResponseData = {
  data: User[];
};

export type LoginResponse = ApiResponse<LoginResponseData>;

export type RegisterResponse = ApiResponse<User>;

export type UsersResponse = ApiResponse<UserResponseData>;
