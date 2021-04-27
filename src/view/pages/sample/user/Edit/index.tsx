// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { usersActions } from 'src/store/state/domain/common/users/slice';
import {
  bookErrorSelector,
  bookSelector,
  bookStatusSelector,
} from 'src/store/state/domain/sample/books/selectors';
import { UserPath, booksPath } from 'src/view/routes/paths';
import { BaseRouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [bookSelector, bookStatusSelector, bookErrorSelector],
  (object, status, error) => ({ object, status, error })
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
  const onBack: ChildProps['onBack'] = useCallback(() => push(backPath), [
    push,
    backPath,
  ]);

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

  const state = useStoreSelector(selector);

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
      {...state}
      title="Edit user"
      onSubmit={onSubmit}
      onBack={onBack}
      onDelete={onDelete}
    />
  );
};

export default Container;
