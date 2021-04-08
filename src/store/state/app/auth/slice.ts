import { createAction } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import {
  getForgotPasswordApiUrl,
  getLoginApiUrl,
  getLogoutApiUrl,
} from 'src/store/urls';
import { createPostAsyncThunk } from 'src/store/utils';
import { ForgotPasswordInput, LoginInput } from './types';

const login = createPostAsyncThunk<
  { key: string; firebaseToken: string },
  unknown,
  LoginInput
>('login', getLoginApiUrl);

const logout = createPostAsyncThunk<unknown, unknown, unknown>(
  'logout',
  getLogoutApiUrl
);

const forgotPassword = createPostAsyncThunk<
  { message: string },
  unknown,
  ForgotPasswordInput
>('forgotPassword', getForgotPasswordApiUrl);

const resetAll = createAction(`${siteName}/resetAll`);

export const authActions = {
  login,
  logout,
  forgotPassword,
  resetAll,
};
