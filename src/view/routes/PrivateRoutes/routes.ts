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

import {
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

export enum MenuType {
  Common,
  // FIXME: SAMPLE CODE
  Division,
}

interface PrivateRouteProps extends RouteProps {
  menuType: MenuType;
}

const privateRoutes: PrivateRouteProps[] = [
  // FIXME: SAMPLE CODE
  { path: projectNewPath, component: ProjectNew, menuType: MenuType.Division },
  {
    path: projectEditPath,
    component: ProjectEdit,
    menuType: MenuType.Division,
  },
  { path: projectsPath, component: ProjectList, menuType: MenuType.Division },
  { path: memberNewPath, component: MemberNew, menuType: MenuType.Division },
  { path: memberEditPath, component: MemberEdit, menuType: MenuType.Division },
  { path: membersPath, component: MemberList, menuType: MenuType.Division },
  { path: divisionNewPath, component: DivisionNew, menuType: MenuType.Common },
  {
    path: divisionEditPath,
    component: DivisionEdit,
    menuType: MenuType.Common,
  },
  { path: divisionsPath, component: DivisionList, menuType: MenuType.Common },

  { path: userEditPath, component: UserEdit, menuType: MenuType.Common },
  { path: usersPath, component: UserList, menuType: MenuType.Common },
  { path: myUserEditPath, component: MyUserEdit, menuType: MenuType.Common },
  {
    path: invitationNewPath,
    component: InvitationNew,
    menuType: MenuType.Common,
  },
  {
    path: invitationEditPath,
    component: InvitationEdit,
    menuType: MenuType.Common,
  },
  {
    path: invitationsPath,
    component: InvitationList,
    menuType: MenuType.Common,
  },
  {
    path: changePasswordPath,
    component: ChangePassword,
    menuType: MenuType.Common,
  },
  { path: verifyEmailPath, component: VerifyEmail, menuType: MenuType.Common },
  { path: rootPath, component: Home, menuType: MenuType.Common },
  { path: otherPath, component: NotFound, menuType: MenuType.Common },
];

export default privateRoutes;

export const privatePaths = privateRoutes
  .map((r) => r.path)
  .flat()
  .filter(notUndefined);
