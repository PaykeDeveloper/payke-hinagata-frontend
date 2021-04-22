import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import ChangePassword from 'src/view/pages/auth/ChangePassword';
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
import DivisionEdit from 'src/view/pages/sample/division/Edit';
import DivisionList from 'src/view/pages/sample/division/List';
import DivisionNew from 'src/view/pages/sample/division/New';
import DivisionShow from 'src/view/pages/sample/division/Show';
import DivisionMemberEdit from 'src/view/pages/sample/divisionMember/Edit';
import DivisionMemberNew from 'src/view/pages/sample/divisionMember/New';
import DivisionProjectEdit from 'src/view/pages/sample/divisionProject/Edit';
import DivisionProjectNew from 'src/view/pages/sample/divisionProject/New';
import UserList from 'src/view/pages/sample/user/List';

import {
  bookCommentEditPath,
  bookCommentNewPath,
  bookEditPath,
  bookPath,
  bookNewPath,
  booksPath,
  otherPath,
  rootPath,
  usersPath,
  divisionPath,
  divisionsPath,
  divisionNewPath,
  divisionEditPath,
  divisionProjectNewPath,
  divisionProjectEditPath,
  verifyEmailPath,
  invitationsPath,
  invitationNewPath,
  invitationEditPath,
  divisionMemberNewPath,
  divisionMemberEditPath,
  changePasswordPath,
} from 'src/view/routes/paths';

const privateRoutes: RouteProps[] = [
  // FIXME: SAMPLE CODE
  { path: bookCommentNewPath, component: BookCommentNew },
  { path: bookCommentEditPath, component: BookCommentEdit },
  { path: bookNewPath, component: BookNew },
  { path: bookEditPath, component: BookEdit },
  { path: bookPath, component: BookShow },
  { path: booksPath, component: BookList },

  // { path: userNewPath, component: UserNew },
  // { path: userEditPath, component: UserEdit },
  // { path: userPath, component: UserShow },
  { path: usersPath, component: UserList },

  // divisions
  { path: divisionsPath, component: DivisionList },
  { path: divisionNewPath, component: DivisionNew },
  { path: divisionEditPath, component: DivisionEdit },
  { path: divisionPath, component: DivisionShow },
  { path: divisionProjectNewPath, component: DivisionProjectNew },
  { path: divisionProjectEditPath, component: DivisionProjectEdit },
  { path: divisionMemberNewPath, component: DivisionMemberNew },
  { path: divisionMemberEditPath, component: DivisionMemberEdit },

  { path: invitationNewPath, component: InvitationNew },
  { path: invitationEditPath, component: InvitationEdit },
  { path: invitationsPath, component: InvitationList },
  { path: changePasswordPath, component: ChangePassword },
  { path: verifyEmailPath, component: VerifyEmail },
  { path: rootPath, component: Home },
  { path: otherPath, component: NotFound },
];

export default privateRoutes;

export const privatePaths = privateRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
