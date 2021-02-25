import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import Login from 'src/views/pages/auth/Login';
import { loginPath } from './constants';

export const publicRoutes: RouteProps[] = [
  { path: loginPath, component: Login },
];

export const publicPaths = publicRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
