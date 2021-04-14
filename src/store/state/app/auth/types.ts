export interface LoginInput {
  email?: string;
  password?: string;
}

export interface RegisterInput {
  name?: string;
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
