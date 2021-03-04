import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import BookEdit from 'src/views/pages/book/Edit';
import BookList from 'src/views/pages/book/List';
import BookNew from 'src/views/pages/book/New';
import BookShow from 'src/views/pages/book/Show';
import BookCommentEdit from 'src/views/pages/bookComment/Edit';
import BookCommentNew from 'src/views/pages/bookComment/New';
import Home from 'src/views/pages/common/Home';
import NotFound from 'src/views/pages/common/NotFound';
import {
  bookCommentEditPath,
  bookCommentNewPath,
  bookEditPath,
  bookPath,
  bookNewPath,
  booksPath,
  otherPath,
  rootPath,
} from 'src/views/routes/paths';

const privateRoutes: RouteProps[] = [
  { path: bookCommentNewPath, component: BookCommentNew },
  { path: bookCommentEditPath, component: BookCommentEdit },
  { path: bookNewPath, component: BookNew },
  { path: bookEditPath, component: BookEdit },
  { path: bookPath, component: BookShow },
  { path: booksPath, component: BookList },

  { path: rootPath, component: Home },
  { path: otherPath, component: NotFound },
];

export default privateRoutes;

export const privatePaths = privateRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
