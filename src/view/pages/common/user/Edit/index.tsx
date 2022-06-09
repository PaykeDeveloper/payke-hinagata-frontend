import { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { localesSelector } from 'src/store/state/domain/common/locales/selectors';
import {
  myUserErrorSelector,
  myUserSelector,
  myUserStatusSelector,
} from 'src/store/state/domain/common/user/selectors';
import { userActions } from 'src/store/state/domain/common/user/slice';
import { UserPath, rootPath } from 'src/view/routes/paths';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [myUserSelector, myUserStatusSelector, myUserErrorSelector, localesSelector],
  (object, status, error, locales) => ({
    object,
    status,
    error,
    locales,
  })
);

const Container: FC<RouteComponentProps<UserPath>> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
  } = props;

  const dispatch = useStoreDispatch();

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        userActions.mergeEntity({ pathParams, bodyParams })
      );
      if (userActions.mergeEntity.fulfilled.match(action)) {
        userActions.fetchEntityIfNeeded({ pathParams: {} });
        push(rootPath);
      }
      return action;
    },
    [dispatch, pathParams, push]
  );

  const state = useStoreSelector(selector);

  return <Component {...state} onSubmit={onSubmit} />;
};

export default Container;
