import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import VerifyEmail from 'src/view/pages/auth/VerifyEmail';
import Home from 'src/view/pages/common/Home';
import InvitationEdit from 'src/view/pages/common/invitation/Edit';
import InvitationList from 'src/view/pages/common/invitation/List';
import InvitationNew from 'src/view/pages/common/invitation/New';
import NotFound from 'src/view/pages/common/NotFound';
import BookEdit from 'src/view/pages/sample/book/Edit';
import BookList from 'src/view/pages/sample/book/List';
import BookNew from 'src/view/pages/sample/book/New';
import BookShow from 'src/view/pages/sample/book/Show';
import BookCommentEdit from 'src/view/pages/sample/bookComment/Edit';
import BookCommentNew from 'src/view/pages/sample/bookComment/New';
import {
  bookCommentEditPath,
  bookCommentNewPath,
  bookEditPath,
  bookPath,
  bookNewPath,
  booksPath,
  otherPath,
  rootPath,
  verifyEmailPath,
  invitationsPath,
  invitationNewPath,
  invitationEditPath,
} from 'src/view/routes/paths';

const privateRoutes: RouteProps[] = [
  // FIXME: SAMPLE CODE
  { path: bookCommentNewPath, component: BookCommentNew },
  { path: bookCommentEditPath, component: BookCommentEdit },
  { path: bookNewPath, component: BookNew },
  { path: bookEditPath, component: BookEdit },
  { path: bookPath, component: BookShow },
  { path: booksPath, component: BookList },

  { path: invitationNewPath, component: InvitationNew },
  { path: invitationEditPath, component: InvitationEdit },
  { path: invitationsPath, component: InvitationList },
  { path: verifyEmailPath, component: VerifyEmail },
  { path: rootPath, component: Home },
  { path: otherPath, component: NotFound },
];

export default privateRoutes;

export const privatePaths = privateRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
