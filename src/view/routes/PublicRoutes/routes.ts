import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import Login from 'src/view/pages/auth/Login';
import { loginPath } from 'src/view/routes/paths';

const publicRoutes: RouteProps[] = [{ path: loginPath, component: Login }];

export default publicRoutes;

export const publicPaths = publicRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
