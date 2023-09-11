import { FC, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { Localization, jaJP as coreJaJP } from '@mui/material/locale';
import { jaJP as dataGridJaJP } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Language } from 'src/base/i18n';
import { WithChildren } from 'src/view/base/types';
import baseTheme from './theme';

const getLocale = (
  lang: string | undefined,
): [Localization | object, Localization | object] => {
  switch (lang) {
    case Language.Japanese: {
      return [coreJaJP, dataGridJaJP];
    }
    default: {
      return [{}, {}];
    }
  }
};

const ThemeProvider: FC<WithChildren> = (props) => {
  const { children } = props;
  const { i18n } = useTranslation();
  const [coreLocale, gridLocale] = getLocale(i18n.language);
  const theme = useMemo(
    () => createTheme(baseTheme, coreLocale, gridLocale),
    [coreLocale, gridLocale],
  );
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
