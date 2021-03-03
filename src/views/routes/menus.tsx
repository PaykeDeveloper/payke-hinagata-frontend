import { ListSubheader } from '@material-ui/core';
import { Trans } from 'react-i18next';
import {
  AddIcon,
  HomeIcon,
  ListIcon,
  MenuBookIcon,
} from 'src/views/base/material-ui/Icon';
import { MenuList } from 'src/views/components/SideMenu';
import {
  bookEditPath,
  bookPath,
  booksNewPath,
  booksPath,
  rootPath,
} from 'src/views/routes/paths';

export const privateMenuLists: MenuList[] = [
  // FIXME: サンプルコードです。
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
        text: <Trans>Books</Trans>,
        icon: <MenuBookIcon />,
        menus: [
          {
            text: <Trans>List</Trans>,
            icon: <ListIcon />,
            to: booksPath,
            paths: [booksPath, bookPath, bookEditPath],
          },
          {
            text: <Trans>Add</Trans>,
            icon: <AddIcon />,
            to: booksNewPath,
            paths: [booksNewPath],
          },
        ],
      },
    ],
  },
];
