import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography: TypographyOptions = {
  button: { textTransform: 'none' },
  overline: { textTransform: 'none' },
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
};

export default typography;
