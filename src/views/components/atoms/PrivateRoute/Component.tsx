import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { loginPath } from 'src/views/routes/paths';

interface Props extends RouteProps {
  isAuthenticated: boolean;
}

const Component: FC<Props> = (props) => {
  const { isAuthenticated, ...otherProps } = props;
  if (isAuthenticated) {
    return <Route {...otherProps} />;
  }
  let next;
  const { location } = otherProps;
  if (location) {
    const { pathname, search } = location;
    next = encodeURI(`${pathname}${search}`);
  }
  const to = `${loginPath}${next && `?next=${next}`}`;
  return <Redirect to={to} />;
};

export default Component;
