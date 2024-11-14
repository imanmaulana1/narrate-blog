export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  credential: string;
  password: string;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export interface AuthLinkProps {
  to: string;
  label: string;
}

export interface AuthWrapperProps extends AuthHeaderProps {
  children: React.ReactNode;
}

interface TokenResponse {
  token: {
    access_token: string;
    token_type: string;
    expires_in: string;
  };
}

export interface ApiErrorResponse {
  success?: boolean;
  message: string;
  errors?: FieldError[];
}

export interface ApiResponse {
  message: string;
}

export interface RegisterResponse extends ApiResponse {
  data: {
    id: string;
    username: string;
    email: string;
    created_at: string;
  };
}

export interface LoginResponse extends ApiResponse {
  data: {
    id: string;
    username: string;
    email: string;
    avatar: string;
    created_at: string;
  };
  token: TokenResponse;
}
