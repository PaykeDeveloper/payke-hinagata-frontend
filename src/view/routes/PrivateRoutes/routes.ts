import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import Home from 'src/view/pages/common/Home';
import NotFound from 'src/view/pages/common/NotFound';
import BookEdit from 'src/view/pages/sample/book/Edit';
import BookList from 'src/view/pages/sample/book/List';
import BookNew from 'src/view/pages/sample/book/New';
import BookShow from 'src/view/pages/sample/book/Show';
import BookCommentEdit from 'src/view/pages/sample/bookComment/Edit';
import BookCommentNew from 'src/view/pages/sample/bookComment/New';
import BooksCsvList from 'src/view/pages/sample/bookImportCsv/List';
import BooksCsvNew from 'src/view/pages/sample/bookImportCsv/New';
import BooksCsvShow from 'src/view/pages/sample/bookImportCsv/Show';
import {
  bookImportCsvPath,
  bookImportCsvsPath,
  bookImportCsvNewPath,
  bookCommentEditPath,
  bookCommentNewPath,
  bookEditPath,
  bookPath,
  bookNewPath,
  booksPath,
  otherPath,
  rootPath,
} from 'src/view/routes/paths';

const privateRoutes: RouteProps[] = [
  // FIXME: SAMPLE CODE
  { path: bookImportCsvNewPath, component: BooksCsvNew },
  { path: bookImportCsvPath, component: BooksCsvShow },
  { path: bookImportCsvsPath, component: BooksCsvList },
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
