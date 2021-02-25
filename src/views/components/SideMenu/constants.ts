import i18next from 'i18next';
import { booksPath } from 'src/views/routes/PrivateRoutes/constants';

interface Menu {
  to: string;
  primaryText: string;
  paths?: string[];
}

export const menus: Menu[] = [
  {
    to: booksPath,
    primaryText: i18next.t('Books'),
  },
];
