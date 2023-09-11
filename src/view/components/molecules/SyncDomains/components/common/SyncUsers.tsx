import { FC, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canViewUsersSelector,
  usersStatusSelector,
} from 'src/store/state/domain/common/users/selectors';
import { usersActions } from 'src/store/state/domain/common/users/slice';
import { checkProcessed } from 'src/store/utils';
import { UserPath } from 'src/view/routes/paths';

type Props = {
  params: Partial<UserPath>;
};

const selector = createSelector(
  [usersStatusSelector, canViewUsersSelector],
  (status, canView) => ({
    processed: checkProcessed(status),
    canView,
  }),
);

const {
  fetchEntitiesIfNeeded,
  fetchEntityIfNeeded,
  resetEntitiesIfNeeded,
  resetEntityIfNeeded,
} = usersActions;

const SyncUsers: FC<Props> = (props) => {
  const {
    params: { userId },
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
    if (processed && canView && userId) {
      dispatch(fetchEntityIfNeeded({ pathParams: { userId } }));
    } else {
      dispatch(resetEntityIfNeeded());
    }
  }, [dispatch, processed, canView, userId]);

  return <></>;
};

export default SyncUsers;
