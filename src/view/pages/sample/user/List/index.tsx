// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  usersErrorSelector,
  usersSelector,
  usersStatusSelector,
  usersUpdatePermissionCheckSelector,
} from 'src/store/state/domain/common/users/selectors';
import { usersActions } from 'src/store/state/domain/common/users/slice';
import { getUserEditPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const permissionSelector = createSelector(
  [usersUpdatePermissionCheckSelector],
  (usersUpdate) => ({ usersUpdate })
);

const selector = createSelector(
  [usersSelector, usersStatusSelector, usersErrorSelector, permissionSelector],
  (users, status, error, permission) => ({
    users,
    statuses: [status],
    errors: [error],
    permission,
  })
);

const List: FC<RouteComponentProps> = (props) => {
  const {
    history: { push },
    location: { pathname, search },
  } = props;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(usersActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);
  const state = useStoreSelector(selector);

  const path = joinString(pathname, search);

  const onClickEdit: ChildProps['onClickEdit'] = useCallback(
    (userId) =>
      push(getUserEditPath({ userId: `${userId}` }), {
        path,
      } as RouterState),
    [push, path]
  );

  return <Component {...state} onClickEdit={onClickEdit} />;
};

export default List;
