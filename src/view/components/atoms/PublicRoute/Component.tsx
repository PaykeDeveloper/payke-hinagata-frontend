import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { rootPath } from 'src/view/routes/paths';

interface Props extends RouteProps {
  isAuthenticated: boolean;
}

const Component: FC<Props> = (props) => {
  const { isAuthenticated, ...otherProps } = props;
  if (!isAuthenticated) {
    return <Route {...otherProps} />;
  }
  return <Redirect to={rootPath} />;
};

export default Component;
