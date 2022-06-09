import { FC, useEffect, useState } from 'react';
import { Theme, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import ScrollToTop from 'src/view/components/atoms/ScrollToTop';
import Footer from 'src/view/components/organisms/Footer';
import Header from 'src/view/components/organisms/Header';
import Sidebar, { drawerWidth } from 'src/view/components/organisms/Sidebar';

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
        <Sidebar upMd={upMd} open={open} setOpen={setOpen} />
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
