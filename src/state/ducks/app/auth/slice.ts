import { createAction } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import { createPostAsyncThunk } from 'src/state/ducks/utils';
import { getLoginApiUrl, getLogoutApiUrl } from 'src/state/urls';

interface LoginInput {
  email?: string;
  password?: string;
}

const login = createPostAsyncThunk<
  { key: string; firebaseToken: string },
  unknown,
  LoginInput
>('login', getLoginApiUrl);

const logout = createPostAsyncThunk<unknown, unknown, unknown>(
  'logout',
  getLogoutApiUrl
);

const resetAll = createAction(`${siteName}/resetAll`);

export const authActions = {
  login,
  logout,
  resetAll,
};
