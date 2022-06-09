import { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canDeleteInvitationSelector,
  canUpdateInvitationSelector,
  invitationErrorSelector,
  invitationSelector,
  invitationStatusSelector,
} from 'src/store/state/domain/common/invitations/selectors';
import { invitationsActions } from 'src/store/state/domain/common/invitations/slice';
import { InvitationStatus } from 'src/store/state/domain/common/invitations/types';
import { userRolesSelector } from 'src/store/state/domain/common/roles/selectors';
import { getErrorMessage } from 'src/store/utils';
import { InvitationPath, invitationsPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    invitationSelector,
    invitationStatusSelector,
    invitationErrorSelector,
    userRolesSelector,
    canUpdateInvitationSelector,
    canDeleteInvitationSelector,
  ],
  (object, status, error, roles, canUpdate, canDelete) => ({
    object,
    status,
    error,
    roles,
    canUpdate,
    canDelete,
  })
);

const Edit: FC<
  RouteComponentProps<InvitationPath, StaticContext, RouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;

  const backTo = location.state?.path || invitationsPath;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(
      invitationsActions.fetchEntityIfNeeded({ pathParams, reset: true })
    );
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        invitationsActions.mergeEntity({ pathParams, bodyParams })
      );
      if (invitationsActions.mergeEntity.fulfilled.match(action)) {
        push(backTo);
      }
      return action;
    },
    [backTo, dispatch, pathParams, push]
  );

  const { enqueueSnackbar } = useSnackbar();
  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(
      invitationsActions.removeEntity({ pathParams })
    );
    if (invitationsActions.removeEntity.fulfilled.match(action)) {
      push(backTo);
    } else if (invitationsActions.removeEntity.rejected.match(action)) {
      if (action.payload) {
        const message = getErrorMessage(action.payload);
        enqueueSnackbar(message, { variant: 'error' });
      }
    }
    return action;
  }, [dispatch, pathParams, push, backTo, enqueueSnackbar]);

  const { canUpdate, canDelete, ...otherState } = useStoreSelector(selector);
  const isPending = otherState.object?.status === InvitationStatus.Pending;
  return (
    <Component
      {...otherState}
      disabled={!canUpdate || !isPending}
      backTo={backTo}
      onSubmit={onSubmit}
      onDelete={canDelete && isPending ? onDelete : undefined}
    />
  );
};

export default Edit;
