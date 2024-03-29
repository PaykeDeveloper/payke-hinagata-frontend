export interface LoginInput {
  email?: string;
  password?: string;
}

export interface RegisterInput {
  password?: string;
  passwordConfirmation?: string;
  id?: string;
  token?: string;
}

export interface ForgotPasswordInput {
  email?: string;
}

export interface ResetPasswordInput {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  token?: string;
}

export interface ChangePasswordInput {
  currentPassword?: string;
  password?: string;
  passwordConfirmation?: string;
}
