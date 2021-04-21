import React, { FC, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useStoreDispatch } from 'src/store';
import { userActions } from 'src/store/state/domain/common/user/slice';
import { loginPath } from 'src/view/routes/paths';

interface Props extends RouteProps {
  isAuthenticated: boolean;

  onMounted: () => void;
}

const Component: FC<Props> = (props) => {
  const { isAuthenticated, onMounted, ...otherProps } = props;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(userActions.fetchEntityIfNeeded({ pathParams: {} }));
    }
  }, [dispatch, onMounted, isAuthenticated]);

  if (isAuthenticated) {
    return <Route {...otherProps} />;
  }
  let next;
  const { location } = otherProps;
  if (location) {
    const { pathname, search } = location;
    next = encodeURIComponent(`${pathname}${search}`);
  }
  const to = `${loginPath}${next && `?next=${next}`}`;
  return <Redirect to={to} />;
};

export default Component;
