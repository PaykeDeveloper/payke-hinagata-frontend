import { RouteProps } from 'react-router-dom';
import { notUndefined } from 'src/base/utils';
import ChangePassword from 'src/view/pages/auth/ChangePassword';
import VerifyEmail from 'src/view/pages/auth/VerifyEmail';
import Home from 'src/view/pages/common/Home';
import InvitationEdit from 'src/view/pages/common/invitation/Edit';
import InvitationList from 'src/view/pages/common/invitation/List';
import InvitationNew from 'src/view/pages/common/invitation/New';
import NotFound from 'src/view/pages/common/NotFound';
import DivisionEdit from 'src/view/pages/sample/division/Edit';
import DivisionList from 'src/view/pages/sample/division/List';
import DivisionNew from 'src/view/pages/sample/division/New';
import DivisionShow from 'src/view/pages/sample/division/Show';
import DivisionMemberEdit from 'src/view/pages/sample/divisionMember/Edit';
import DivisionMemberList from 'src/view/pages/sample/divisionMember/List';
import DivisionMemberNew from 'src/view/pages/sample/divisionMember/New';
import DivisionProjectEdit from 'src/view/pages/sample/divisionProject/Edit';
import DivisionProjectList from 'src/view/pages/sample/divisionProject/List';
import DivisionProjectNew from 'src/view/pages/sample/divisionProject/New';
import UserList from 'src/view/pages/sample/user/List';

import {
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
  divisionProjectsPath,
  divisionMembersPath,
} from 'src/view/routes/paths';

const privateRoutes: RouteProps[] = [
  { path: usersPath, component: UserList },

  // divisions
  { path: divisionsPath, component: DivisionList },
  { path: divisionNewPath, component: DivisionNew },
  { path: divisionEditPath, component: DivisionEdit },
  { path: divisionPath, component: DivisionShow },
  { path: divisionProjectsPath, component: DivisionProjectList },
  { path: divisionProjectNewPath, component: DivisionProjectNew },
  { path: divisionProjectEditPath, component: DivisionProjectEdit },
  { path: divisionMembersPath, component: DivisionMemberList },
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
