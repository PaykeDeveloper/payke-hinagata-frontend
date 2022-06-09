import { ThemeOptions, Theme } from '@mui/material';
import components from './overrides';
import palette from './palette';
import typography from './typography';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

const theme: ThemeOptions = {
  palette,
  typography,
  components,
};

export default theme;
