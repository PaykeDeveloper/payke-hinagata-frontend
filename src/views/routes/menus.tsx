import { ReactNode } from 'react';
import i18next from 'i18next';
import { HomeIcon, MenuBookIcon } from 'src/views/base/material-ui/Icon';
import { booksPath, rootPath } from 'src/views/routes/paths';

interface Menu {
  to: string;
  primaryText: string;
  icon?: ReactNode;
  paths?: string[];
}

const privateMenus: Menu[] = [
  // FIXME: サンプルコードです。
  {
    to: rootPath,
    primaryText: i18next.t('Home'),
    icon: <HomeIcon />,
  },
  {
    to: booksPath,
    primaryText: i18next.t('Books'),
    icon: <MenuBookIcon />,
  },
];

export default privateMenus;
