import React, { ComponentProps, FC, useCallback, useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  invitationsErrorSelector,
  invitationsStatusSelector,
} from 'src/store/state/domain/common/invitations/selectors';
import { invitationsActions } from 'src/store/state/domain/common/invitations/slice';
import { localesSelector } from 'src/store/state/domain/common/locales/selectors';
import { userRolesSelector } from 'src/store/state/domain/common/roles/selectors';
import { invitationsPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    invitationsStatusSelector,
    invitationsErrorSelector,
    userRolesSelector,
    localesSelector,
  ],
  (status, error, roles, locales) => ({
    status,
    error,
    roles,
    locales,
  })
);

const New: FC<RouteComponentProps<{}, StaticContext, RouterState>> = (
  props
) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;
  const backPath = location.state?.path || invitationsPath;
  const onBack: ChildProps['onBack'] = useCallback(
    () => push(backPath),
    [push, backPath]
  );

  const dispatch = useStoreDispatch();

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        invitationsActions.addEntity({ pathParams, bodyParams })
      );
      if (invitationsActions.addEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const state = useStoreSelector(selector);
  const { roles, locales } = state;
  const object = useMemo(() => {
    const roleNames = roles
      .filter(({ required }) => required)
      .map(({ name }) => name);
    return { locale: locales[0]?.value, roleNames };
  }, [roles, locales]);

  return (
    <Component {...state} object={object} onSubmit={onSubmit} onBack={onBack} />
  );
};

export default New;
