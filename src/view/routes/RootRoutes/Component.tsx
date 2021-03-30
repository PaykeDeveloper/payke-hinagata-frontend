import React, { FC, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import CSS from 'csstype';
import { Route, Switch } from 'react-router-dom';
import { StoreStatus } from 'src/store/types';
import PrivateRoute from 'src/view/components/atoms/PrivateRoute';
import { otherPath } from 'src/view/routes/paths';
import PrivateRoutes from 'src/view/routes/PrivateRoutes';
import PublicRoutes, { publicPaths } from 'src/view/routes/PublicRoutes';

const loaderStyle: CSS.Properties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const Component: FC<{
  status?: StoreStatus;

  onMounted: () => void;
}> = (props) => {
  const { status, onMounted } = props;
  useEffect(() => {
    if (status === StoreStatus.Initial) {
      onMounted();
    }
  }, [onMounted, status]);

  if (status === StoreStatus.Initial || status === StoreStatus.Started) {
    return (
      <div style={loaderStyle}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Switch>
      <Route path={publicPaths} component={PublicRoutes} />
      <PrivateRoute path={otherPath} component={PrivateRoutes} />
    </Switch>
  );
};

export default Component;