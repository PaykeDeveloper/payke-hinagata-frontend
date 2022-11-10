import { FC } from 'react';
import {
  AppBar,
  IconButton,
  Slide,
  Toolbar,
  styled,
  useScrollTrigger,
} from '@mui/material';
import { MenuIcon } from 'src/view/base/material-ui/Icon';
import Logo from 'src/view/components/atoms/Logo';
import { drawerWidth } from 'src/view/components/organisms/Sidebar';
import SettingButton from './SettingButton';

const StyledToolbar = styled(Toolbar, {
  shouldForwardProp: (propName) => propName !== 'shift',
})<{ shift: boolean }>(({ theme, shift }) =>
  shift
    ? {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    : {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }
);
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
const StyledDiv = styled('div')({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
});
const StyledLogo = styled(Logo)(({ theme }) => ({
  maxWidth: theme.spacing(20),
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
  const handleDrawer = () => setOpen(!open);
  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar color="default">
          <StyledToolbar shift={upMd && open}>
            <StyledIconButton color="inherit" onClick={handleDrawer}>
              <MenuIcon />
            </StyledIconButton>
            <StyledDiv>
              <StyledLogo />
            </StyledDiv>
            <SettingButton />
          </StyledToolbar>
        </AppBar>
      </Slide>
      <StyledAppBar position="static" elevation={0}>
        <Toolbar />
      </StyledAppBar>
    </>
  );
};

export default Header;
