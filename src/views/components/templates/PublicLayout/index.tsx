import React, { FC } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ScrollToTop from 'src/views/components/atoms/ScrollToTop';
import Footer from 'src/views/components/organisms/Footer';
import { useStyles } from 'src/views/components/templates/PrivateLayout';

const PublicLayout: FC = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <>
      <ScrollToTop />
      <div className={classes.wrapper}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <div style={{ flexGrow: 1 }} />
            {/*<PublicSettingsButton />*/}
          </Toolbar>
        </AppBar>
        <main>{children}</main>
        <footer className={classes.footer}>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default PublicLayout;
