import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { userRolesSelector } from 'src/store/state/domain/common/roles/selectors';
import {
  checkDeleteUserSelector,
  checkUpdateUserSelector,
  userErrorSelector,
  userSelector,
  userStatusSelector,
} from 'src/store/state/domain/common/users/selectors';
import { usersActions } from 'src/store/state/domain/common/users/slice';
import { UserPath, booksPath } from 'src/view/routes/paths';
import { BaseRouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    userSelector,
    userStatusSelector,
    userErrorSelector,
    userRolesSelector,
    checkUpdateUserSelector,
    checkDeleteUserSelector,
  ],
  (object, status, error, roles, checkUpdate, checkDelete) => ({
    object,
    status,
    error,
    roles,
    checkUpdate,
    checkDelete,
  })
);

export type UserEditRouterState =
  | (BaseRouterState & {
      fromShow: boolean;
    })
  | undefined;

const Container: FC<
  RouteComponentProps<UserPath, StaticContext, UserEditRouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;

  const backPath = location.state?.path || booksPath;
  const onBack: ChildProps['onBack'] = useCallback(
    () => push(backPath),
    [push, backPath]
  );

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(usersActions.fetchEntityIfNeeded({ pathParams, reset: true }));
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        usersActions.mergeEntity({ pathParams, bodyParams })
      );
      if (usersActions.mergeEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const fromShow = location.state?.fromShow;
  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(usersActions.removeEntity({ pathParams }));
    if (usersActions.removeEntity.fulfilled.match(action)) {
      if (fromShow) {
        push(booksPath);
      } else {
        onBack();
      }
    }
    return action;
  }, [dispatch, pathParams, onBack, push, fromShow]);

  const { checkUpdate, checkDelete, ...otherState } =
    useStoreSelector(selector);
  const canUpdate = checkUpdate(otherState.object?.id);
  const canDelete = checkDelete(otherState.object?.id);

  return (
    <Component
      {...otherState}
      disabled={!canUpdate}
      title="Edit user"
      onSubmit={onSubmit}
      onBack={onBack}
      onDelete={canDelete ? onDelete : undefined}
    />
  );
};

export default Container;
