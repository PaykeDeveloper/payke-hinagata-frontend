import React, { FC, useEffect } from 'react';
import { useStoreDispatch } from 'src/store';
import { rolesActions } from 'src/store/state/domain/common/roles/slice';

const { fetchEntitiesIfNeeded } = rolesActions;

const SyncMemberGroups: FC = (props) => {
  const { children } = props;
  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);

  return <>{children}</>;
};

export default SyncMemberGroups;
