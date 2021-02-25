import i18next from 'i18next';
import { booksPath } from 'src/views/routes/paths';

interface Menu {
  to: string;
  primaryText: string;
  paths?: string[];
}

const privateMenus: Menu[] = [
  {
    to: booksPath,
    primaryText: i18next.t('Books'),
  },
];

export default privateMenus;
