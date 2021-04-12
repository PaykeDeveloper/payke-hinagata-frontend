import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import ForgotPassword from 'src/view/pages/auth/ForgotPassword';
import Login from 'src/view/pages/auth/Login';
import Register from 'src/view/pages/auth/Register';
import ResetPassword from 'src/view/pages/auth/ResetPassword';
import {
  forgotPasswordPath,
  loginPath,
  registerPath,
  resetPasswordPath,
} from 'src/view/routes/paths';

const publicRoutes: RouteProps[] = [
  { path: loginPath, component: Login },
  { path: registerPath, component: Register },
  { path: forgotPasswordPath, component: ForgotPassword },
  { path: resetPasswordPath, component: ResetPassword },
];

export default publicRoutes;

export const publicPaths = publicRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
