import React, { FC } from 'react';

import Drawer from '@mui/material/Drawer';
import SwipeDrawer from '@mui/material/SwipeableDrawer';
import makeStyles from '@mui/styles/makeStyles';
import SideMenu from 'src/view/routes/PrivateSideMenu';

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:
      theme.palette.mode === 'light'
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
