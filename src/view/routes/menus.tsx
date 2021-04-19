import { ListSubheader } from '@material-ui/core';
import { Trans } from 'react-i18next';
import {
  AddIcon,
  HomeIcon,
  ListIcon,
  MenuBookIcon,
  MenuUserIcon,
  PersonAddIcon,
} from 'src/view/base/material-ui/Icon';
import { MenuList } from 'src/view/components/molecules/SideMenu';
import {
  bookEditPath,
  bookPath,
  bookNewPath,
  booksPath,
  rootPath,
  bookCommentNewPath,
  bookCommentEditPath,
  usersPath,
  userNewPath,
  userPath,
  userEditPath,
  divisionsPath,
  divisionNewPath,
  divisionPath,
  divisionEditPath,
  invitationsPath,
  invitationNewPath,
} from 'src/view/routes/paths';

export const privateMenuLists: MenuList[] = [
  // FIXME: SAMPLE CODE
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
        <Trans>Menu</Trans>
      </ListSubheader>
    ),
    menus: [
      {
        text: <Trans>Invitations</Trans>,
        icon: <PersonAddIcon />,
        to: invitationsPath,
        paths: [invitationsPath, invitationNewPath],
      },
      {
        text: <Trans>Books</Trans>,
        icon: <MenuBookIcon />,
        menus: [
          {
            text: <Trans>List</Trans>,
            icon: <ListIcon />,
            to: booksPath,
            paths: [
              booksPath,
              bookPath,
              bookEditPath,
              bookCommentNewPath,
              bookCommentEditPath,
            ],
          },
          {
            text: <Trans>Add</Trans>,
            icon: <AddIcon />,
            to: bookNewPath,
            paths: [bookNewPath],
          },
        ],
      },
      {
        text: <Trans>Users</Trans>,
        icon: <MenuUserIcon />,
        menus: [
          {
            text: <Trans>List</Trans>,
            icon: <ListIcon />,
            to: usersPath,
            paths: [usersPath, userNewPath, userPath, userEditPath],
          },
          {
            text: <Trans>Add</Trans>,
            icon: <AddIcon />,
            to: userNewPath,
            paths: [userNewPath],
          },
        ],
      },
      {
        text: <Trans>Division</Trans>,
        icon: <MenuUserIcon />,
        menus: [
          {
            text: <Trans>List</Trans>,
            icon: <ListIcon />,
            to: divisionsPath,
            paths: [
              divisionsPath,
              divisionNewPath,
              divisionPath,
              divisionEditPath,
            ],
          },
          {
            text: <Trans>Add</Trans>,
            icon: <AddIcon />,
            to: divisionNewPath,
            paths: [divisionNewPath],
          },
        ],
      },
    ],
  },
];
