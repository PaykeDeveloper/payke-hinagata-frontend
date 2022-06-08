import React, { FC, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { jaJP as coreJaJP, Localization } from '@mui/material/locale';
import { jaJP as dataGridJaJP } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Language } from 'src/base/i18n';
import baseTheme from './theme';

const getLocale = (
  lang: string | undefined
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

const ThemeProvider: FC = (props) => {
  const { children } = props;
  const { i18n } = useTranslation();
  const [coreLocale, gridLocale] = getLocale(i18n.language);
  const theme = useMemo(
    () => createTheme(baseTheme, coreLocale, gridLocale),
    [coreLocale, gridLocale]
  );
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
