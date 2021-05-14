import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  usersErrorSelector,
  usersSelector,
  usersStatusSelector,
  checkEditUserSelector,
} from 'src/store/state/domain/common/users/selectors';
import { usersActions } from 'src/store/state/domain/common/users/slice';
import { getUserEditPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    usersSelector,
    usersStatusSelector,
    usersErrorSelector,
    checkEditUserSelector,
  ],
  (users, status, error, checkEdit) => ({
    users,
    statuses: [status],
    errors: [error],
    checkEdit,
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

  const path = joinString(pathname, search);

  const onClickEdit: ChildProps['onClickEdit'] = useCallback(
    (userId) =>
      push(getUserEditPath({ userId: `${userId}` }), {
        path,
      } as RouterState),
    [push, path]
  );

  const state = useStoreSelector(selector);

  return <Component {...state} onClickEdit={onClickEdit} />;
};

export default List;