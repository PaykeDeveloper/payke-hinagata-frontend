import { ThemeOptions } from '@mui/material';
import { Theme } from '@mui/material/styles';
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
