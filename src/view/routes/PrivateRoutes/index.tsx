import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import SyncDomains from 'src/view/components/molecules/SyncDomains';
import PrivateLayout from 'src/view/components/templates/PrivateLayout';
import privateRoutes, { privatePaths } from './routes';
export { default as privateRoutes, privatePaths } from './routes';

const PrivateRoutes: FC = () => {
  return (
    <PrivateLayout>
      <Switch>
        {privateRoutes.map((route, index) => (
          <Route key={index} exact {...route} />
        ))}
      </Switch>
      <Route path={privatePaths} component={SyncDomains} />
    </PrivateLayout>
  );
};
export default PrivateRoutes;
