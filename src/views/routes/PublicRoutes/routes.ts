import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import Login from 'src/views/pages/common/Login';
import { loginPath } from 'src/views/routes/paths';

const publicRoutes: RouteProps[] = [{ path: loginPath, component: Login }];

export default publicRoutes;

export const publicPaths = publicRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
