import { FC } from 'react';
import { Drawer, styled, SwipeableDrawer } from '@mui/material';
import SideMenu from 'src/view/routes/PrivateSideMenu';

export const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  },
}));

const StyledSwipeDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
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
}

const Sidebar: FC<Props> = (props) => {
  const { upMd, open, setOpen } = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return upMd ? (
    <StyledDrawer variant="persistent" open={open}>
      <SideMenu />
    </StyledDrawer>
  ) : (
    <StyledSwipeDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
      <SideMenu onClickMenu={handleClose} />
    </StyledSwipeDrawer>
  );
};

export default Sidebar;
