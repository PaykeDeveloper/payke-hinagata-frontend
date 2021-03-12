import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import clsx from 'clsx';
import { MenuIcon } from 'src/views/base/material-ui/Icon';
import Logo from 'src/views/components/common/Logo';
import { drawerWidth } from 'src/views/components/common/Sidebar';
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
