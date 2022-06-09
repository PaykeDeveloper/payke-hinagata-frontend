import React, { FC } from 'react';

import {
  AppBar,
  IconButton,
  Slide,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { MenuIcon } from 'src/view/base/material-ui/Icon';
import Logo from 'src/view/components/atoms/Logo';
import { drawerWidth } from 'src/view/components/organisms/Sidebar';
import SettingButton from './SettingButton';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  backAppBar: {
    backgroundColor: theme.palette.background.default,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    // overflowX: 'auto',
    // whiteSpace: 'nowrap',
  },
  logo: {
    maxWidth: theme.spacing(20),
  },
}));

export interface MapDispatchToProps {
  upMd: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

type Props = MapDispatchToProps;

const Header: FC<Props> = (props) => {
  const { upMd, open, setOpen } = props;
  const trigger = useScrollTrigger();
  const classes = useStyles();
  const handleDrawer = () => setOpen(!open);
  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar color="default">
          <Toolbar
            className={clsx(classes.toolBar, {
              [classes.toolBarShift]: upMd && open,
            })}
          >
            <IconButton
              color="inherit"
              onClick={handleDrawer}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.grow}>
              <Logo className={classes.logo} />
            </div>
            <SettingButton />
          </Toolbar>
        </AppBar>
      </Slide>
      <AppBar position="static" elevation={0} className={classes.backAppBar}>
        <Toolbar />
      </AppBar>
    </>
  );
};

export default Header;
