// FIXME: SAMPLE CODE

import { FC, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canViewDivisionsSelector,
  divisionsStatusSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
import { checkProcessed } from 'src/store/utils';
import { DivisionPath } from 'src/view/routes/paths';

type Props = {
  params: Partial<DivisionPath>;
};

const selector = createSelector(
  [divisionsStatusSelector, canViewDivisionsSelector],
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
} = divisionsActions;

const SyncDivisions: FC<Props> = (props) => {
  const {
    params: { divisionId },
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
    if (processed && canView && divisionId) {
      dispatch(fetchEntityIfNeeded({ pathParams: { divisionId } }));
    } else {
      dispatch(resetEntityIfNeeded());
    }
  }, [dispatch, processed, canView, divisionId]);

  return <>{children}</>;
};

export default SyncDivisions;
