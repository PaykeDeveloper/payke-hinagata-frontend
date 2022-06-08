import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { siteName } from 'src/base/constants';
import { drawerWidth } from 'src/view/components/organisms/Sidebar';

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  footerShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

interface Props {
  upMd?: boolean;
  open?: boolean;
}

const Footer: FC<Props> = (props) => {
  const { upMd, open } = props;
  const classes = useStyles();
  return (
    <Box
      height="100%"
      textAlign="center"
      className={clsx(classes.footer, {
        [classes.footerShift]: upMd && open,
      })}
    >
      <Typography variant="caption">© {siteName}</Typography>
    </Box>
  );
};

export default Footer;
