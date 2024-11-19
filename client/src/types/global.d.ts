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
};

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

type HandleLogout = () => void;

export type DropDownProps = {
  currentUser: DecodedToken | null;
  handleLogout: HandleLogout;
};

export type PostHeaderProps = {
  order: 'asc' | 'desc';
  sort: 'created_at' | 'views';
  handleOrderChange: (
    newOrder: 'asc' | 'desc',
    newSort: 'created_at' | 'views'
  ) => void;
};

export type PostPaginationProps = {
  page: number;
  handlePageChange: (
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    newPage: number
  ) => void;
  posts:
    | {
        data: {
          data: Post[];
          pagination: {
            totalPage: number;
            currentPage: number;
            has_more: boolean;
          };
        };
      }
    | undefined;
};
