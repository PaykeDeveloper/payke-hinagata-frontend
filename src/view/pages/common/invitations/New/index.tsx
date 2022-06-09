import { ComponentProps, FC, useCallback, useEffect, useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canCreateInvitationSelector,
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
    canCreateInvitationSelector,
  ],
  (status, error, roles, locales, canCreate) => ({
    status,
    error,
    roles,
    locales,
    canCreate,
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
  const backTo = location.state?.path || invitationsPath;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(
      invitationsActions.fetchEntitiesIfNeeded({ pathParams: {}, reset: true })
    );
  }, [dispatch]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        invitationsActions.addEntity({ pathParams, bodyParams })
      );
      if (invitationsActions.addEntity.fulfilled.match(action)) {
        push(backTo);
      }
      return action;
    },
    [backTo, dispatch, pathParams, push]
  );

  const { canCreate, ...otherState } = useStoreSelector(selector);
  const { roles, locales } = otherState;
  const object = useMemo(() => {
    const roleNames = roles
      .filter(({ required }) => required)
      .map(({ name }) => name);
    return { locale: locales[0]?.value, roleNames };
  }, [roles, locales]);

  return (
    <Component
      {...otherState}
      object={object}
      disabled={!canCreate}
      backTo={backTo}
      onSubmit={onSubmit}
    />
  );
};

export default New;
