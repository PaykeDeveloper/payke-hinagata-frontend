import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { userRolesSelector } from 'src/store/state/domain/common/roles/selectors';
import {
  checkDeleteUserSelector,
  userErrorSelector,
  userSelector,
  userStatusSelector,
} from 'src/store/state/domain/common/users/selectors';
import { usersActions } from 'src/store/state/domain/common/users/slice';
import { UserPath, booksPath } from 'src/view/routes/paths';
import { BaseRouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    userSelector,
    userStatusSelector,
    userErrorSelector,
    userRolesSelector,
    checkDeleteUserSelector,
  ],
  (object, status, error, roles, checkDelete) => ({
    object,
    status,
    error,
    roles,
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
    const reset = true;
    dispatch(usersActions.fetchEntityIfNeeded({ pathParams, reset }));
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

  const { checkDelete, ...otherState } = useStoreSelector(selector);
  const canDelete = checkDelete(otherState.object?.id);

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

  return (
    <Form
      {...otherState}
      title="Edit user"
      onSubmit={onSubmit}
      onBack={onBack}
      onDelete={canDelete ? onDelete : undefined}
    />
  );
};

export default Container;
