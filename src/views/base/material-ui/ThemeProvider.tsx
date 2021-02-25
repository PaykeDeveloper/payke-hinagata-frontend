import React, { FC } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';

const ThemeProvider: FC = (props) => {
  const { children } = props;
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
