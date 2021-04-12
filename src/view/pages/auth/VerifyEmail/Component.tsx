import React, { FC, useEffect, useState } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  loader: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const Component: FC<{
  onSubmit: () => Promise<unknown>;
}> = (props) => {
  const { onSubmit, children } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onSubmit().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  ) : (
    <>{children}</>
  );
};

export default Component;
