import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
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
  divisionSelector,
  divisionsSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { menuDivisionIdSelector } from 'src/store/state/ui/menu/selectors';
import { menuActions } from 'src/store/state/ui/menu/slice';
import {
  DomainIcon,
  GroupsIcon,
  HomeIcon,
  FolderIcon,
  PeopleIcon,
  PersonAddIcon,
} from 'src/view/base/material-ui/Icon';
import {
  divisionEditPath,
  divisionNewPath,
  divisionsPath,
  getMemberEditPath,
  getMemberNewPath,
  getMembersPath,
  getProjectEditPath,
  getProjectUploadPath,
  getProjectNewPath,
  getProjectsPath,
  invitationEditPath,
  invitationNewPath,
  invitationsPath,
  memberParams,
  projectParams,
  rootPath,
  userEditPath,
  usersPath,
} from '../paths';
import Component, { MenuList, SelectableMenu } from './Component';

type ChildProps = ComponentProps<typeof Component>;

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
const getMiddleMenuLists = (
  divisions: Division[],
  menuDivisionId: number | null
): MenuList<SelectableMenu>[] => {
  const divisionId = menuDivisionId != null ? `${menuDivisionId}` : null;
  return [
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
          selects: divisions.map((division) => ({
            text: division.name,
            value: division.id,
          })),
          menus: divisionId
            ? [
                {
                  text: <Trans>Projects</Trans>,
                  icon: <FolderIcon />,
                  to: getProjectsPath({ divisionId }),
                  paths: [
                    getProjectsPath({ divisionId }),
                    getProjectNewPath({ divisionId }),
                    getProjectEditPath({ ...projectParams, divisionId }),
                    getProjectUploadPath({ divisionId }),
                  ],
                },
                {
                  text: <Trans>Members</Trans>,
                  icon: <PeopleIcon />,
                  to: getMembersPath({ divisionId }),
                  paths: [
                    getMembersPath({ ...projectParams, divisionId }),
                    getMemberNewPath({ ...projectParams, divisionId }),
                    getMemberEditPath({ ...memberParams, divisionId }),
                  ],
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
        },
      ],
    },
  ];
};

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
        paths: [divisionsPath, divisionNewPath, divisionEditPath],
        requiredPermissions: [
          divisionPermission.viewOwn,
          divisionPermission.viewAll,
        ],
      },
      {
        text: <Trans>Users</Trans>,
        icon: <GroupsIcon />,
        to: usersPath,
        paths: [usersPath, userEditPath],
        requiredPermissions: [userPermission.viewOwn, userPermission.viewAll],
      },
      {
        text: <Trans>Invitations</Trans>,
        icon: <PersonAddIcon />,
        to: invitationsPath,
        paths: [invitationsPath, invitationNewPath, invitationEditPath],
        requiredPermissions: [invitationPermission.viewAll],
      },
    ],
  },
];

const selector = createSelector(
  [
    divisionsSelector,
    divisionSelector,
    menuDivisionIdSelector,
    userPermissionNamesSelector,
  ],
  (divisions, division, menuDivisionId, userPermissionNames) => ({
    divisions,
    division,
    menuDivisionId,
    userPermissionNames,
  })
);

const PrivateSideMenu: FC<{
  pathname: string;
  onClickMenu?: (event: unknown) => void;
}> = (props) => {
  const dispatch = useStoreDispatch();

  const { divisions, division, menuDivisionId, userPermissionNames } =
    useStoreSelector(selector);

  const currentDivisionId = division?.id;
  useEffect(() => {
    if (!menuDivisionId && currentDivisionId) {
      dispatch(menuActions.setDivisionId(currentDivisionId));
    }
  }, [dispatch, menuDivisionId, currentDivisionId]);

  const onChangeDivisionId: ChildProps['onChangeDivisionId'] = useCallback(
    (value) => {
      const id = value ? toSafeInteger(value) : null;
      dispatch(menuActions.setDivisionId(id));
    },
    [dispatch]
  );

  const middleMenuLists = useMemo(
    () => getMiddleMenuLists(divisions, menuDivisionId),
    [divisions, menuDivisionId]
  );

  const permissionNames = useMemo(() => {
    const division = divisions.find((d) => d.id === menuDivisionId);
    const memberPermissionNames = division?.permissionNames ?? [];
    return [...memberPermissionNames, ...(userPermissionNames ?? [])];
  }, [userPermissionNames, divisions, menuDivisionId]);

  return (
    <Component
      topMenuLists={topMenuLists}
      middleMenuLists={middleMenuLists}
      bottomMenuLists={bottomMenuLists}
      menuDivisionId={menuDivisionId}
      permissionNames={permissionNames}
      onChangeDivisionId={onChangeDivisionId}
      {...props}
    />
  );
};

export default PrivateSideMenu;
