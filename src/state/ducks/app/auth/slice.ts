import { createPostAsyncThunk } from 'src/state/ducks/utils';
import { getLoginApiUrl, getLogoutApiUrl } from 'src/state/urls';

interface LoginInput {
  username?: string;
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

export const authActions = {
  login,
  logout,
};
