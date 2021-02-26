import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import BookEdit from 'src/views/pages/book/Edit';
import BookList from 'src/views/pages/book/List';
import BookNew from 'src/views/pages/book/New';
import Home from 'src/views/pages/common/Home';
import NotFound from 'src/views/pages/common/NotFound';
import {
  bookEditPath,
  booksNewPath,
  booksPath,
  otherPath,
  rootPath,
} from 'src/views/routes/paths';

const privateRoutes: RouteProps[] = [
  { path: booksNewPath, component: BookNew },
  { path: bookEditPath, component: BookEdit },
  { path: booksPath, component: BookList },

  { path: rootPath, component: Home },
  { path: otherPath, component: NotFound },
];

export default privateRoutes;

export const privatePaths = privateRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
