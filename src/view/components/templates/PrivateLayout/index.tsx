import { FC, useEffect, useState } from 'react';
import { Theme, styled, useMediaQuery } from '@mui/material';
import { WithChildren } from 'src/view/base/types';
import ScrollToTop from 'src/view/components/atoms/ScrollToTop';
import Footer from 'src/view/components/organisms/Footer';
import Header from 'src/view/components/organisms/Header';
import Sidebar, { drawerWidth } from 'src/view/components/organisms/Sidebar';

export const footerSpace = 8;

export const StyledDiv = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  position: 'relative',
  boxSizing: 'border-box',
  paddingBottom: theme.spacing(footerSpace),
}));
const StyledMain = styled('main', {
  shouldForwardProp: (propName) => propName !== 'shift',
})<{ shift: boolean }>(({ theme, shift }) =>
  shift
    ? {
        marginLeft: drawerWidth,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    : {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }
);
export const StyledFooter = styled('footer')(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  bottom: 0,
  height: theme.spacing(footerSpace),
}));

const PrivateLayout: FC<WithChildren> = (props) => {
  const { children } = props;
  const upMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [open, setOpen] = useState(upMd);
  useEffect(() => {
    setOpen(upMd);
  }, [upMd]);

  return (
    <>
      <ScrollToTop />
      <StyledDiv>
        <Header upMd={upMd} open={open} setOpen={setOpen} />
        <Sidebar upMd={upMd} open={open} setOpen={setOpen} />
        <StyledMain shift={upMd && open}>{children}</StyledMain>
        <StyledFooter>
          <Footer upMd={upMd} open={open} />
        </StyledFooter>
      </StyledDiv>
    </>
  );
};

export default PrivateLayout;
