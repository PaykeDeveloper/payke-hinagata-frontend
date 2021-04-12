export interface LoginInput {
  email?: string;
  password?: string;
}

export interface RegisterInput {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
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
