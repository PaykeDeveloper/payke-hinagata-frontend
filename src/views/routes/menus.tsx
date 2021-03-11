import { ListSubheader } from '@material-ui/core';
import { Trans } from 'react-i18next';
import {
  AddIcon,
  HomeIcon,
  ListIcon,
  MenuBookIcon,
} from 'src/views/components/base/material-ui/Icon';
import { MenuList } from 'src/views/components/common/SideMenu';
import {
  bookEditPath,
  bookPath,
  bookNewPath,
  booksPath,
  rootPath,
  bookCommentNewPath,
  bookCommentEditPath,
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
    ],
  },
];
