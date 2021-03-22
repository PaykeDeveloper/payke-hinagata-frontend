import React, { FC } from 'react';

import { Route, Switch } from 'react-router-dom';
import PrivateLayout from 'src/views/components/templates/PrivateLayout';
import privateRoutes from './routes';
export { default as privateRoutes, privatePaths } from './routes';

const PrivateRoutes: FC = () => {
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
export default PrivateRoutes;
