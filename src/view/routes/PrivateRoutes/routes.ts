import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import ChangePassword from 'src/view/pages/auth/ChangePassword';
import VerifyEmail from 'src/view/pages/auth/VerifyEmail';
import Home from 'src/view/pages/common/common/Home';
import NotFound from 'src/view/pages/common/common/NotFound';
import InvitationEdit from 'src/view/pages/common/invitations/Edit';
import InvitationList from 'src/view/pages/common/invitations/List';
import InvitationNew from 'src/view/pages/common/invitations/New';
import MyUserEdit from 'src/view/pages/common/user/Edit';
import UserEdit from 'src/view/pages/common/users/Edit';
import UserList from 'src/view/pages/common/users/List';
import DivisionEdit from 'src/view/pages/division/divisions/Edit';
import DivisionList from 'src/view/pages/division/divisions/List';
import DivisionNew from 'src/view/pages/division/divisions/New';
import MemberEdit from 'src/view/pages/division/members/Edit';
import MemberList from 'src/view/pages/division/members/List';
import MemberNew from 'src/view/pages/division/members/New';
import ProjectEdit from 'src/view/pages/sample/projects/Edit';
import ProjectList from 'src/view/pages/sample/projects/List';
import ProjectNew from 'src/view/pages/sample/projects/New';
import ProjectUpload from 'src/view/pages/sample/projects/Upload';

import {
  projectUploadPath,
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
  myUserEditPath,
} from 'src/view/routes/paths';

const privateRoutes: RouteProps[] = [
  // FIXME: SAMPLE CODE
  { path: projectUploadPath, component: ProjectUpload },
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
  { path: myUserEditPath, component: MyUserEdit },
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
