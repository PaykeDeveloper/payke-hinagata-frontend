import React, { FC } from 'react';

import { Route, Switch } from 'react-router-dom';
import PublicLayout from 'src/view/components/templates/PublicLayout';
import publicRoutes from './routes';
export { default as publicRoutes, publicPaths } from './routes';

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
