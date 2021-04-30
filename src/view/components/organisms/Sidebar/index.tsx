import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import SwipeDrawer from '@material-ui/core/SwipeableDrawer';
import SideMenu from 'src/view/routes/PrivateSideMenu';

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  },
}));

interface Props {
  upMd: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;

  pathname: string;
}

const Sidebar: FC<Props> = (props) => {
  const { upMd, open, setOpen, pathname } = props;
  const classes = useStyles();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return upMd ? (
    <Drawer
      classes={{ paper: classes.drawerPaper }}
      variant="persistent"
      open={open}
    >
      <SideMenu pathname={pathname} />
    </Drawer>
  ) : (
    <SwipeDrawer
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      classes={{ paper: classes.drawerPaper }}
    >
      <SideMenu pathname={pathname} onClickMenu={handleClose} />
    </SwipeDrawer>
  );
};

export default Sidebar;
