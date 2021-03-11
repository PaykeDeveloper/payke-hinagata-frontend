import React, { FC, useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import Footer from 'src/views/components/common/Footer';
import Header from 'src/views/components/common/Header';
import ScrollToTop from 'src/views/components/common/ScrollToTop';
import Sidebar, { drawerWidth } from 'src/views/components/common/Sidebar';
import { privateMenuLists } from 'src/views/routes/menus';

export const footerSpace = 8;

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    position: 'relative',
    boxSizing: 'border-box',
    paddingBottom: theme.spacing(footerSpace),
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: theme.spacing(footerSpace),
  },
}));

const PrivateLayout: FC = (props) => {
  const { children } = props;
  const upMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const { pathname } = useLocation();
  const [open, setOpen] = useState(upMd);
  useEffect(() => {
    setOpen(upMd);
  }, [upMd]);

  const classes = useStyles();
  return (
    <>
      <ScrollToTop />
      <div className={classes.wrapper}>
        <Header upMd={upMd} open={open} setOpen={setOpen} />
        <Sidebar
          upMd={upMd}
          open={open}
          setOpen={setOpen}
          pathname={pathname}
          menuLists={privateMenuLists}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: upMd && open,
          })}
        >
          {children}
        </main>
        <footer className={classes.footer}>
          <Footer upMd={upMd} open={open} />
        </footer>
      </div>
    </>
  );
};

export default PrivateLayout;
