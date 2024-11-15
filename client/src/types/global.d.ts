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

export type CarouselItem = {
  image: string;
  alt: string;
  description: string;
}

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success?: boolean;
  message: string;
  errors?: FieldError[];
};

export type FieldError = {
  message: string;
  field: string;
};

export type DecodedToken = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  iat: number;
  exp: number;
};
