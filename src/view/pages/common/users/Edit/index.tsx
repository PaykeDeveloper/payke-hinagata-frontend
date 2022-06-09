import React, { ComponentProps, FC, useCallback } from 'react';
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
import { UserPath, usersPath } from 'src/view/routes/paths';
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

export type UserEditRouterState = BaseRouterState | undefined;

const Container: FC<
  RouteComponentProps<UserPath, StaticContext, UserEditRouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;

  const backTo = location.state?.path || usersPath;

  const dispatch = useStoreDispatch();

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        usersActions.mergeEntity({ pathParams, bodyParams })
      );
      if (usersActions.mergeEntity.fulfilled.match(action)) {
        push(backTo);
      }
      return action;
    },
    [backTo, dispatch, pathParams, push]
  );

  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(usersActions.removeEntity({ pathParams }));
    if (usersActions.removeEntity.fulfilled.match(action)) {
      push(backTo);
    }
    return action;
  }, [backTo, dispatch, pathParams, push]);

  const { checkUpdate, checkDelete, ...otherState } =
    useStoreSelector(selector);
  const canUpdate = checkUpdate(otherState.object?.id);
  const canDelete = checkDelete(otherState.object?.id);

  return (
    <Component
      {...otherState}
      disabled={!canUpdate}
      title="Edit user"
      backTo={backTo}
      onSubmit={onSubmit}
      onDelete={canDelete ? onDelete : undefined}
    />
  );
};

export default Container;
