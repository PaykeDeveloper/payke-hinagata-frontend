import { ReactNode } from 'react';
import i18next from 'i18next';
import { MenuBookIcon } from 'src/views/base/material-ui/Icon';
import { booksPath } from 'src/views/routes/paths';

interface Menu {
  to: string;
  primaryText: string;
  icon?: ReactNode;
  paths?: string[];
}

const privateMenus: Menu[] = [
  // FIXME: サンプルコードです。
  {
    to: booksPath,
    primaryText: i18next.t('Books'),
    icon: <MenuBookIcon />,
  },
];

export default privateMenus;
