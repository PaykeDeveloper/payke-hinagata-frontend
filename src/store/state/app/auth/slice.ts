import { createAction } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import {
  getForgotPasswordApiUrl,
  getLoginApiUrl,
  getLogoutApiUrl,
  getRegisterApiUrl,
  getResetPasswordApiUrl,
} from 'src/store/urls';
import { createPostAsyncThunk } from 'src/store/utils';
import {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from './types';

const login = createPostAsyncThunk<
  { key: string; firebaseToken: string },
  unknown,
  LoginInput
>('login', getLoginApiUrl);

const logout = createPostAsyncThunk<unknown, unknown, unknown>(
  'logout',
  getLogoutApiUrl
);

const register = createPostAsyncThunk<
  { message: string },
  unknown,
  RegisterInput
>('register', getRegisterApiUrl);

const forgotPassword = createPostAsyncThunk<
  { message: string },
  unknown,
  ForgotPasswordInput
>('forgotPassword', getForgotPasswordApiUrl);

const resetPassword = createPostAsyncThunk<
  { message: string },
  unknown,
  ResetPasswordInput
>('resetPassword', getResetPasswordApiUrl);

const resetAll = createAction(`${siteName}/resetAll`);

export const authActions = {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  resetAll,
};
