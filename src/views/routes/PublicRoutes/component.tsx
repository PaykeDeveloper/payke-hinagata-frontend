import React, { FC } from 'react';

import { Route, Switch } from 'react-router-dom';
import PublicLayout from 'src/views/components/common/PublicLayout';
import publicRoutes from './routes';

const PublicRoutes: FC = () => {
  return (
    <PublicLayout>
      <Switch>
        {publicRoutes.map((route, index) => (
          <Route key={index} exact {...route} />
        ))}
      </Switch>
    </PublicLayout>
  );
};
export default PublicRoutes;
