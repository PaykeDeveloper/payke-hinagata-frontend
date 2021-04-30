import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ListSubheader } from '@material-ui/core';
import { createSelector } from '@reduxjs/toolkit';
import { Trans } from 'react-i18next';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { PermissionFactory } from 'src/store/state/domain/common/permissions/factories';
import { permissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import {
  divisionsErrorSelector,
  divisionsSelector,
  divisionsStatusSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
import { menuDivisionIdSelector } from 'src/store/state/ui/menu/selectors';
import { menuActions } from 'src/store/state/ui/menu/slice';
import {
  HomeIcon,
  ListIcon,
  MenuUserIcon,
  PersonAddIcon,
} from 'src/view/base/material-ui/Icon';
import {
  getMembersPath,
  getProjectsPath,
  invitationNewPath,
  invitationsPath,
  rootPath,
  userPath,
  usersPath,
} from '../paths';
import Component, { MenuList } from './Component';

type ChildProps = Omit<
  ComponentProps<typeof Component>,
  'menuLists' | 'permissionNames' | 'requiredPermissionNames'
>;

// Home Menu
const defaultHomeMenu: MenuList = {
  menus: [
    {
      text: <Trans>Home</Trans>,
      icon: <HomeIcon />,
      to: rootPath,
      paths: [rootPath],
    },
  ],
};

// Divisions Menu
const divisionsSelectMenuSelector = createSelector(
  [divisionsSelector, menuDivisionIdSelector],
  (divisions, menuDivisionId): MenuList => ({
    menus: [
      {
        text: <Trans>Division</Trans>,
        name: 'divisionId',
        label: 'Division',
        selects: divisions.map((division) => ({
          text: division.name,
          value: `${division.id}`,
        })),
        menus: menuDivisionId
          ? [
              {
                text: <Trans>Projects</Trans>,
                icon: <ListIcon />,
                to: getProjectsPath({ divisionId: `${menuDivisionId}` }),
                paths: [getProjectsPath({ divisionId: `${menuDivisionId}` })],
              },
              {
                text: <Trans>Members</Trans>,
                icon: <MenuUserIcon />,
                to: getMembersPath({ divisionId: `${menuDivisionId}` }),
                paths: [getMembersPath({ divisionId: `${menuDivisionId}` })],
                requiredPermissions: PermissionFactory.CreateOwnAll('division'),
              },
            ]
          : [],
        requiredPermissions: PermissionFactory.ViewOwnAll('division'),
      },
    ],
  })
);

// Sub Menu
const defaultSubMenu: MenuList = {
  subheader: (
    <ListSubheader>
      <Trans>Menu</Trans>
    </ListSubheader>
  ),
  menus: [
    {
      text: <Trans>Invitations</Trans>,
      icon: <PersonAddIcon />,
      to: invitationsPath,
      paths: [invitationsPath, invitationNewPath],
      requiredPermissions: PermissionFactory.ViewAll('invitation'),
    },
    {
      text: <Trans>Users</Trans>,
      icon: <MenuUserIcon />,
      menus: [
        {
          text: <Trans>List</Trans>,
          icon: <ListIcon />,
          to: usersPath,
          paths: [usersPath, userPath],
        },
      ],
    },
  ],
};

const selector = createSelector(
  [
    divisionsSelectMenuSelector,
    divisionsStatusSelector,
    divisionsErrorSelector,
    menuDivisionIdSelector,
    permissionNamesSelector,
  ],
  (divisionsSelectMenu, status, error, currentDivisionId, permissionNames) => ({
    divisionsSelectMenu,
    status,
    error,
    currentDivisionId,
    permissionNames,
  })
);

interface DivisionSelectValue {
  divisionId: number | null;
}

const List: FC<ChildProps> = (props) => {
  const [homeMenus] = useState(defaultHomeMenu);
  const [subMenus] = useState(defaultSubMenu);

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(divisionsActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);

  const state = useStoreSelector(selector);

  const divisionSelectInitialValues = { divisionId: state.currentDivisionId };

  const onChange = useCallback(
    (data: DivisionSelectValue) => {
      dispatch(menuActions.setDivisionId(data.divisionId));
    },
    [dispatch]
  );

  const menuLists = [homeMenus, state.divisionsSelectMenu, subMenus];
  return (
    <Component
      menuLists={menuLists}
      {...props}
      initialValues={divisionSelectInitialValues}
      onChange={onChange}
      permissionNames={state.permissionNames}
    />
  );
};

export default List;
