import React, { FC } from 'react';
import { ListSubheader } from '@mui/material';
import { Trans } from 'react-i18next';
import { useStoreSelector } from 'src/store';
import { userPermissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import { memberPermission } from 'src/store/state/domain/division/members/selectors';
import { projectPermission } from 'src/store/state/domain/sample/projects/selectors';
import {
  ArrowBackIcon,
  FolderIcon,
  PeopleIcon,
} from 'src/view/base/material-ui/Icon';
import SideMenu, { MenuList } from 'src/view/components/molecules/SideMenu';
import {
  getMembersPath,
  getProjectsPath,
  memberEditPath,
  memberNewPath,
  membersPath,
  projectEditPath,
  projectNewPath,
  projectsPath,
  rootPath,
} from 'src/view/routes/paths';
import { PrivateSideMenuProps } from '../../types';

const ManufacturerSideMenu: FC<PrivateSideMenuProps> = ({
  path,
  params,
  onClickMenu,
}) => {
  const menuList: MenuList[] = [
    {
      menus: [
        {
          text: <Trans>ホームへ戻る</Trans>,
          icon: <ArrowBackIcon />,
          to: rootPath,
          paths: [],
        },
      ],
    },
    {
      subheader: (
        <ListSubheader>
          <Trans>メーカーメニュー</Trans>
        </ListSubheader>
      ),
      menus: [
        {
          text: <Trans>Projects</Trans>,
          icon: <FolderIcon />,
          to: getProjectsPath(params),
          paths: [projectsPath, projectNewPath, projectEditPath],
          permissions: [projectPermission.viewAll],
        },
        {
          text: <Trans>Members</Trans>,
          icon: <PeopleIcon />,
          to: getMembersPath(params),
          paths: [membersPath, memberNewPath, memberEditPath],
          permissions: [memberPermission.viewOwn, memberPermission.viewAll],
        },
      ],
    },
  ];

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

export default ManufacturerSideMenu;
