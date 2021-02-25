import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import Books from 'src/views/pages/book/Books';
import NotFound from 'src/views/pages/common/NotFound';
import Root from 'src/views/pages/common/Root';
import { booksPath, otherPath, rootPath } from 'src/views/routes/paths';

const privateRoutes: RouteProps[] = [
  { path: booksPath, component: Books },
  { path: rootPath, component: Root },
  { path: otherPath, component: NotFound },
];

export default privateRoutes;

export const privatePaths = privateRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);