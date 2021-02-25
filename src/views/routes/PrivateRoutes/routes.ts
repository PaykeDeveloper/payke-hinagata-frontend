import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import Books from 'src/views/pages/book/Books';
import Home from 'src/views/pages/common/Home';
import NotFound from 'src/views/pages/common/NotFound';
import { booksPath, otherPath, rootPath } from 'src/views/routes/paths';

const privateRoutes: RouteProps[] = [
  { path: booksPath, component: Books },

  { path: rootPath, component: Home },
  { path: otherPath, component: NotFound },
];

export default privateRoutes;

export const privatePaths = privateRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
