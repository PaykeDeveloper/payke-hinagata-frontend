import React, { FC, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canViewInvitationsSelector,
  invitationsStatusSelector,
} from 'src/store/state/domain/common/invitations/selectors';
import { invitationsActions } from 'src/store/state/domain/common/invitations/slice';
import { checkProcessed } from 'src/store/utils';
import { InvitationPath } from 'src/view/routes/paths';

type Props = {
  params: Partial<InvitationPath>;
};

const selector = createSelector(
  [invitationsStatusSelector, canViewInvitationsSelector],
  (status, canView) => ({
    processed: checkProcessed(status),
    canView,
  })
);

const {
  fetchEntitiesIfNeeded,
  fetchEntityIfNeeded,
  resetEntitiesIfNeeded,
  resetEntityIfNeeded,
} = invitationsActions;

const SyncInvitations: FC<Props> = (props) => {
  const {
    params: { invitationId },
    children,
  } = props;
  const { processed, canView } = useStoreSelector(selector);
  const dispatch = useStoreDispatch();
  useEffect(() => {
    if (canView) {
      dispatch(fetchEntitiesIfNeeded({ pathParams: {} }));
    } else {
      dispatch(resetEntitiesIfNeeded());
    }
  }, [dispatch, canView]);

  useEffect(() => {
    if (processed && canView && invitationId) {
      dispatch(fetchEntityIfNeeded({ pathParams: { invitationId } }));
    } else {
      dispatch(resetEntityIfNeeded());
    }
  }, [dispatch, processed, canView, invitationId]);

  return <>{children}</>;
};

export default SyncInvitations;
