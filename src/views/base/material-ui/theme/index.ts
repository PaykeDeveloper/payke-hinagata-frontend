import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import overrides from './overrides';
import palette from './palette';
import typography from './typography';

const theme: ThemeOptions = {
  palette,
  typography,
  overrides,
};

export default theme;
