import { FC, useEffect } from 'react';
import { useStoreDispatch } from 'src/store';
import { localesActions } from 'src/store/state/domain/common/locales/slice';

const { fetchEntitiesIfNeeded } = localesActions;

const SyncLocales: FC = () => {
  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);

  return <></>;
};

export default SyncLocales;
