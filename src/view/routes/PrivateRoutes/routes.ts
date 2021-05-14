import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import ChangePassword from 'src/view/pages/auth/ChangePassword';
import VerifyEmail from 'src/view/pages/auth/VerifyEmail';
import Home from 'src/view/pages/common/Home';
import InvitationEdit from 'src/view/pages/common/invitation/Edit';
import InvitationList from 'src/view/pages/common/invitation/List';
import InvitationNew from 'src/view/pages/common/invitation/New';
import NotFound from 'src/view/pages/common/NotFound';
import UserEdit from 'src/view/pages/common/user/Edit';
import UserList from 'src/view/pages/common/user/List';
import DivisionEdit from 'src/view/pages/division/division/Edit';
import DivisionList from 'src/view/pages/division/division/List';
import DivisionNew from 'src/view/pages/division/division/New';
import MemberEdit from 'src/view/pages/division/member/Edit';
import MemberList from 'src/view/pages/division/member/List';
import MemberNew from 'src/view/pages/division/member/New';
import BookEdit from 'src/view/pages/sample/book/Edit';
import ImporterBooksList from 'src/view/pages/sample/book/Importer';
import BookList from 'src/view/pages/sample/book/List';
import BookNew from 'src/view/pages/sample/book/New';
import BookShow from 'src/view/pages/sample/book/Show';
import BookCommentEdit from 'src/view/pages/sample/bookComment/Edit';
import BookCommentNew from 'src/view/pages/sample/bookComment/New';
import ProjectEdit from 'src/view/pages/sample/project/Edit';
import ProjectList from 'src/view/pages/sample/project/List';
import ProjectNew from 'src/view/pages/sample/project/New';

import {
  importerBooksPath,
  bookCommentEditPath,
  bookCommentNewPath,
  bookEditPath,
  bookPath,
  bookNewPath,
  booksPath,
  otherPath,
  rootPath,
  usersPath,
  divisionsPath,
  divisionNewPath,
  divisionEditPath,
  projectNewPath,
  projectEditPath,
  verifyEmailPath,
  invitationsPath,
  invitationNewPath,
  invitationEditPath,
  memberNewPath,
  memberEditPath,
  changePasswordPath,
  projectsPath,
  membersPath,
  userEditPath,
} from 'src/view/routes/paths';

const privateRoutes: RouteProps[] = [
  // FIXME: SAMPLE CODE
  { path: importerBooksPath, component: ImporterBooksList },
  { path: bookCommentNewPath, component: BookCommentNew },
  { path: bookCommentEditPath, component: BookCommentEdit },
  { path: bookNewPath, component: BookNew },
  { path: bookEditPath, component: BookEdit },
  { path: bookPath, component: BookShow },
  { path: booksPath, component: BookList },
  { path: projectNewPath, component: ProjectNew },
  { path: projectEditPath, component: ProjectEdit },
  { path: projectsPath, component: ProjectList },
  { path: memberNewPath, component: MemberNew },
  { path: memberEditPath, component: MemberEdit },
  { path: membersPath, component: MemberList },
  { path: divisionNewPath, component: DivisionNew },
  { path: divisionEditPath, component: DivisionEdit },
  { path: divisionsPath, component: DivisionList },

  { path: userEditPath, component: UserEdit },
  { path: usersPath, component: UserList },
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
