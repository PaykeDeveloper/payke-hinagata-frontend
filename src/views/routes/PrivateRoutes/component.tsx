import React, { FC } from 'react';

import { Route, Switch } from 'react-router-dom';
import PrivateLayout from 'src/views/components/common/PrivateLayout';
import privateRoutes from './routes';

const Component: FC = () => {
  return (
    <PrivateLayout>
      <Switch>
        {privateRoutes.map((route, index) => (
          <Route key={index} exact {...route} />
        ))}
      </Switch>
    </PrivateLayout>
  );
};
export default Component;
