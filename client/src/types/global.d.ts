export interface registerData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface loginData {
  credential: string;
  password: string;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success?: boolean;
  message: string;
  errors?: FieldError[];
}
