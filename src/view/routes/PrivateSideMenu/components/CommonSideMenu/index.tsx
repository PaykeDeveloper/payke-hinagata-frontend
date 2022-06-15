import { FC } from 'react';
import { ListSubheader } from '@mui/material';
import { Trans } from 'react-i18next';
import { useStoreSelector } from 'src/store';
import { invitationPermission } from 'src/store/state/domain/common/invitations/selectors';
import { userPermissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import { userPermission } from 'src/store/state/domain/common/users/selectors';
import { divisionPermission } from 'src/store/state/domain/division/divisions/selectors';
import {
  DomainIcon,
  GroupsIcon,
  HomeIcon,
  PersonAddIcon,
} from 'src/view/base/material-ui/Icon';
import SideMenu, { MenuList } from 'src/view/components/molecules/SideMenu';
import {
  divisionEditPath,
  divisionNewPath,
  divisionsPath,
  invitationEditPath,
  invitationNewPath,
  invitationsPath,
  rootPath,
  userEditPath,
  usersPath,
} from 'src/view/routes/paths';
import { PrivateSideMenuProps } from '../../types';

const menuList: MenuList[] = [
  {
    menus: [
      {
        text: <Trans>Home</Trans>,
        icon: <HomeIcon />,
        to: rootPath,
        paths: [rootPath],
      },
    ],
  },
  {
    subheader: (
      <ListSubheader>
        <Trans>Main Menu</Trans>
      </ListSubheader>
    ),
    menus: [
      {
        text: <Trans>Divisions</Trans>,
        icon: <DomainIcon />,
        to: divisionsPath,
        paths: [divisionsPath, divisionNewPath, divisionEditPath],
        permissions: [divisionPermission.viewOwn, divisionPermission.viewAll],
      },
      {
        text: <Trans>Users</Trans>,
        icon: <GroupsIcon />,
        to: usersPath,
        paths: [usersPath, userEditPath],
        permissions: [userPermission.viewOwn, userPermission.viewAll],
      },
      {
        text: <Trans>Invitations</Trans>,
        icon: <PersonAddIcon />,
        to: invitationsPath,
        paths: [invitationsPath, invitationNewPath, invitationEditPath],
        permissions: [invitationPermission.viewAll],
      },
    ],
  },
];

const CommonSideMenu: FC<PrivateSideMenuProps> = ({ path, onClickMenu }) => {
  const permissionNames = useStoreSelector(userPermissionNamesSelector);
  return (
    <SideMenu
      permissionNames={permissionNames}
      menuLists={menuList}
      path={path}
      onClickMenu={onClickMenu}
    />
  );
};

export default CommonSideMenu;
