import { FC, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Switch } from 'react-router-dom';
import { StoreStatus } from 'src/store/types';
import PrivateRoute from 'src/view/components/atoms/PrivateRoute';
import PublicRoute from 'src/view/components/atoms/PublicRoute';
import { otherPath } from 'src/view/routes/paths';
import PrivateRoutes from 'src/view/routes/PrivateRoutes';
import PublicRoutes, { publicPaths } from 'src/view/routes/PublicRoutes';

const useStyles = makeStyles({
  loader: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const Component: FC<{
  status?: StoreStatus;

  onMounted: () => void;
}> = (props) => {
  const { status, onMounted } = props;
  const classes = useStyles();
  useEffect(() => {
    if (status === StoreStatus.Initial) {
      onMounted();
    }
  }, [onMounted, status]);

  if (status === StoreStatus.Initial || status === StoreStatus.Started) {
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Switch>
      <PublicRoute path={publicPaths} component={PublicRoutes} />
      <PrivateRoute path={otherPath} component={PrivateRoutes} />
    </Switch>
  );
};

export default Component;
