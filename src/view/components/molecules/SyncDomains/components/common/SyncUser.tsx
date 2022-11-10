import { FC, useEffect } from 'react';
import { useStoreDispatch } from 'src/store';
import { userActions } from 'src/store/state/domain/common/user/slice';

const { fetchEntityIfNeeded } = userActions;

const SyncUser: FC = () => {
  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(fetchEntityIfNeeded({ pathParams: {} }));
  }, [dispatch]);

  return <></>;
};

export default SyncUser;
