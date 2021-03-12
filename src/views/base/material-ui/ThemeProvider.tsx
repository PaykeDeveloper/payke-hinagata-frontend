import React, { FC, useMemo } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import { jaJP } from '@material-ui/core/locale';
import { useTranslation } from 'react-i18next';
import baseTheme from './theme';

const getLocale = (lang: string | undefined) => {
  console.log(lang);
  switch (lang) {
    case 'ja': {
      return jaJP;
    }
    default: {
      return {};
    }
  }
};

const ThemeProvider: FC = (props) => {
  const { children } = props;
  const { i18n } = useTranslation();
  const locale = getLocale(i18n.language);
  const theme = useMemo(() => createMuiTheme(baseTheme, locale), [locale]);
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
