import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StoreStatus } from 'src/state/types/base';

const useStyles = makeStyles((theme) => {
  const backgroundColor =
    theme.palette.type === 'light'
      ? 'rgba(255,255,255,0.5)'
      : 'rgba(0,0,0,0.5)';
  return {
    wrapper: { position: 'relative' },
    fabProgress: {
      backgroundColor,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});

const FabProgress = () => {
  const classes = useStyles();
  return (
    <div className={classes.fabProgress}>
      <CircularProgress size={68} />
    </div>
  );
};

export type LoaderProps =
  | {
      status: StoreStatus;
    }
  | {
      loading: boolean;
    };

const checkLoading = (status: StoreStatus) => status === StoreStatus.Started;

const Loader: FC<LoaderProps> = (props) => {
  const { children } = props;
  const classes = useStyles();
  const loading =
    'status' in props ? checkLoading(props.status) : props.loading;
  return (
    <div className={classes.wrapper}>
      {children}
      {loading && <FabProgress />}
    </div>
  );
};

export default Loader;
