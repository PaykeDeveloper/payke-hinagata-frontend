import React, { FC } from 'react';

import { Route, Switch } from 'react-router-dom';
import PrivateLayout from 'src/views/components/PrivateLayout';
import privateRoutes, {
  privatePaths,
} from 'src/views/routes/PrivateRoutes/routes';

const Component: FC = () => {
  return (
    <PrivateLayout>
      <Switch>
        {privateRoutes.map((route, index) => (
          <Route key={index} exact {...route} />
        ))}
      </Switch>
      <Route path={privatePaths} />
    </PrivateLayout>
  );
};
export default Component;
