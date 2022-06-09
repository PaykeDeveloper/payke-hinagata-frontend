import { FC } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import ScrollToTop from 'src/view/components/atoms/ScrollToTop';
import Footer from 'src/view/components/organisms/Footer';
import {
  StyledDiv,
  StyledFooter,
} from 'src/view/components/templates/PrivateLayout';

const PublicLayout: FC = (props) => {
  const { children } = props;
  return (
    <>
      <ScrollToTop />
      <StyledDiv>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <div style={{ flexGrow: 1 }} />
            {/*<PublicSettingsButton />*/}
          </Toolbar>
        </AppBar>
        <main>{children}</main>
        <StyledFooter>
          <Footer />
        </StyledFooter>
      </StyledDiv>
    </>
  );
};

export default PublicLayout;
