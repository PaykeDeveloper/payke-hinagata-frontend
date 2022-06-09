// FIXME: SAMPLE CODE

import { FC, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canViewMembersSelector,
  membersStatusSelector,
} from 'src/store/state/domain/division/members/selectors';
import { membersActions } from 'src/store/state/domain/division/members/slice';
import { checkProcessed } from 'src/store/utils';
import { MemberPath } from 'src/view/routes/paths';

type Props = {
  params: Partial<MemberPath>;
};

const selector = createSelector(
  [membersStatusSelector, canViewMembersSelector],
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
} = membersActions;

const SyncMembers: FC<Props> = (props) => {
  const {
    params: { divisionId, memberId },
    children,
  } = props;
  const { processed, canView } = useStoreSelector(selector);
  const dispatch = useStoreDispatch();
  useEffect(() => {
    if (canView && divisionId) {
      dispatch(
        fetchEntitiesIfNeeded({ pathParams: { divisionId }, reset: true })
      );
    } else {
      dispatch(resetEntitiesIfNeeded());
    }
  }, [dispatch, canView, divisionId]);

  useEffect(() => {
    if (processed && canView && divisionId && memberId) {
      dispatch(
        fetchEntityIfNeeded({
          pathParams: { divisionId, memberId },
          reset: true,
        })
      );
    } else {
      dispatch(resetEntityIfNeeded());
    }
  }, [dispatch, processed, canView, divisionId, memberId]);

  return <>{children}</>;
};

export default SyncMembers;
