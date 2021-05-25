import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StoreStatus } from 'src/store/types';
import { checkProcessed } from 'src/store/utils';

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

const FabProgress: FC<{ side: number }> = ({ side }) => {
  const classes = useStyles();
  return (
    <div className={classes.fabProgress}>
      <CircularProgress size={side} />
    </div>
  );
};

export type LoaderProps = { size?: number } & (
  | {
      status: StoreStatus;
    }
  | {
      loading: boolean;
    }
  | {
      statuses: StoreStatus[];
    }
);

const Loader: FC<LoaderProps> = (props) => {
  const { children, size } = props;
  const classes = useStyles();
  const loading = (() => {
    if ('status' in props) {
      return !checkProcessed(props.status);
    } else if ('loading' in props) {
      return props.loading;
    } else if ('statuses' in props) {
      return !props.statuses.every((s) => checkProcessed(s));
    }
  })();
  return (
    <div className={classes.wrapper}>
      {children}
      {loading && <FabProgress side={size || 68} />}
    </div>
  );
};

export default Loader;
