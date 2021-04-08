import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import ForgotPassword from 'src/view/pages/auth/ForgotPassword';
import Login from 'src/view/pages/auth/Login';
import ResetPassword from 'src/view/pages/auth/ResetPassword';
import {
  forgotPasswordPath,
  loginPath,
  resetPasswordPath,
} from 'src/view/routes/paths';

const publicRoutes: RouteProps[] = [
  { path: loginPath, component: Login },
  { path: forgotPasswordPath, component: ForgotPassword },
  { path: resetPasswordPath, component: ResetPassword },
];

export default publicRoutes;

export const publicPaths = publicRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
