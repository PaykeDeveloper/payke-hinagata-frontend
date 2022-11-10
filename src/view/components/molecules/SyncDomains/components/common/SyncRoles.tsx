import { FC, useEffect } from 'react';
import { useStoreDispatch } from 'src/store';
import { rolesActions } from 'src/store/state/domain/common/roles/slice';

const { fetchEntitiesIfNeeded } = rolesActions;

const SyncRoles: FC = () => {
  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);

  return <></>;
};

export default SyncRoles;
