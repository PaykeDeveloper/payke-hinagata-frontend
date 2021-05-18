import React, { ChangeEvent, FC, useCallback, useEffect, useMemo } from 'react';
import { ListSubheader } from '@material-ui/core';
import { createSelector } from '@reduxjs/toolkit';
import toSafeInteger from 'lodash/toSafeInteger';
import { Trans } from 'react-i18next';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { invitationPermission } from 'src/store/state/domain/common/invitations/selectors';
import { userPermissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import { userPermission } from 'src/store/state/domain/common/users/selectors';
import {
  divisionPermission,
  divisionsSelector,
  memberPermissionNamesSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
import { menuDivisionIdSelector } from 'src/store/state/ui/menu/selectors';
import { menuActions } from 'src/store/state/ui/menu/slice';
import {
  DomainIcon,
  HomeIcon,
  ListIcon,
  MenuUserIcon,
  PersonAddIcon,
} from 'src/view/base/material-ui/Icon';
import {
  divisionNewPath,
  divisionsPath,
  getMembersPath,
  getProjectsPath,
  invitationNewPath,
  invitationsPath,
  rootPath,
  userPath,
  usersPath,
} from '../paths';
import Component, { MenuList, SelectableMenu } from './Component';

type ChildProps = {
  pathname: string;
  onClickMenu?: (event: unknown) => void;
};

// Home Menu
const topMenuLists: MenuList[] = [
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
];

// Divisions Menu
const middleMenuListsSelector = createSelector(
  [divisionsSelector, menuDivisionIdSelector, userPermissionNamesSelector],
  (divisions, menuDivisionId, permissionNames): MenuList<SelectableMenu>[] => [
    {
      subheader: (
        <ListSubheader>
          <Trans>Division Menu</Trans>
        </ListSubheader>
      ),
      menus: [
        {
          text: <Trans>Division</Trans>,
          name: 'divisionId',
          label: 'Division',
          selects: [
            {
              text: 'Select',
              value: '',
            },
            ...divisions.map((division) => ({
              text: division.name,
              value: `${division.id}`,
            })),
          ],
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
                  requiredPermissions: [
                    divisionPermission.createOwn,
                    divisionPermission.createAll,
                  ],
                },
              ]
            : [],
          requiredPermissions: [
            divisionPermission.viewOwn,
            divisionPermission.viewAll,
          ],
          permissionNames,
        },
      ],
    },
  ]
);

// Sub Menu
const bottomMenuLists: MenuList[] = [
  {
    subheader: (
      <ListSubheader>
        <Trans>Sub Menu</Trans>
      </ListSubheader>
    ),
    menus: [
      {
        text: <Trans>Divisions</Trans>,
        icon: <DomainIcon />,
        to: divisionsPath,
        paths: [divisionsPath, divisionNewPath],
        requiredPermissions: [
          divisionPermission.viewOwn,
          divisionPermission.viewAll,
        ],
      },
      {
        text: <Trans>Users</Trans>,
        icon: <MenuUserIcon />,
        to: usersPath,
        paths: [usersPath, userPath],
        requiredPermissions: [userPermission.viewOwn, userPermission.viewAll],
      },
      {
        text: <Trans>Invitations</Trans>,
        icon: <PersonAddIcon />,
        to: invitationsPath,
        paths: [invitationsPath, invitationNewPath],
        requiredPermissions: [invitationPermission.viewAll],
      },
    ],
  },
];

const selector = createSelector(
  [
    middleMenuListsSelector,
    menuDivisionIdSelector,
    userPermissionNamesSelector,
    memberPermissionNamesSelector,
  ],
  (
    middleMenuLists,
    currentDivisionId,
    userPermissionNames,
    memberPermissionNames
  ) => ({
    middleMenuLists,
    currentDivisionId,
    userPermissionNames,
    memberPermissionNames,
  })
);

const PrivateSideMenu: FC<ChildProps> = (props) => {
  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(divisionsActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);

  const {
    middleMenuLists,
    currentDivisionId,
    userPermissionNames,
    memberPermissionNames,
  } = useStoreSelector(selector);

  const permissionNames = useMemo(
    () => [...(memberPermissionNames ?? []), ...(userPermissionNames ?? [])],
    [userPermissionNames, memberPermissionNames]
  );

  const onChange = useCallback(
    (data: ChangeEvent<HTMLInputElement>) => {
      if (data.target.value === '') {
        dispatch(menuActions.setDivisionId(null));
      } else {
        dispatch(menuActions.setDivisionId(toSafeInteger(data.target.value)));
      }
    },
    [dispatch]
  );

  return (
    <Component
      topMenuLists={topMenuLists}
      middleMenuLists={middleMenuLists}
      bottomMenuLists={bottomMenuLists}
      initialValue={`${currentDivisionId || ''}`}
      onChange={onChange}
      permissionNames={permissionNames}
      {...props}
    />
  );
};

export default PrivateSideMenu;
