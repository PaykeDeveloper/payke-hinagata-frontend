import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canCreateInvitationSelector,
  canEditInvitationSelector,
  invitationsErrorSelector,
  invitationsSelector,
  invitationsStatusSelector,
} from 'src/store/state/domain/common/invitations/selectors';
import { invitationsActions } from 'src/store/state/domain/common/invitations/slice';
import {
  getInvitationEditPath,
  invitationNewPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    invitationsSelector,
    invitationsStatusSelector,
    invitationsErrorSelector,
    canCreateInvitationSelector,
    canEditInvitationSelector,
  ],
  (invitations, status, error, canCreate, canEdit) => ({
    invitations,
    status,
    error,
    canCreate,
    canEdit,
  })
);

const List: FC<RouteComponentProps> = (props) => {
  const {
    history: { push },
    location: { pathname, search },
  } = props;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(invitationsActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);

  const path = joinString(pathname, search);

  const onClickAdd: ChildProps['onClickAdd'] = useCallback(
    () => push(invitationNewPath, { path } as RouterState),
    [push, path]
  );

  const onClickEdit: ChildProps['onClickEdit'] = useCallback(
    (invitationId) =>
      push(getInvitationEditPath({ invitationId: `${invitationId}` }), {
        path,
      } as RouterState),
    [push, path]
  );

  const { canCreate, canEdit, ...otherState } = useStoreSelector(selector);

  return (
    <Component
      {...otherState}
      onClickAdd={canCreate ? onClickAdd : undefined}
      onClickEdit={canEdit ? onClickEdit : undefined}
    />
  );
};

export default List;