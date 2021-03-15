import React, { FC, useCallback } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import { statusStatusSelector } from 'src/store/state/app/status/selectors';
import { statusActions } from 'src/store/state/app/status/slice';
import { useStoreDispatch, useStoreSelector } from 'src/store/store';
import Component from './component';

const selector = createSelector([statusStatusSelector], (status) => ({
  status,
}));

const Container: FC = () => {
  const state = useStoreSelector(selector);

  const dispatch = useStoreDispatch();
  const onMounted = useCallback(
    () => dispatch(statusActions.fetchEntityIfNeeded({ pathParams: {} })),
    [dispatch]
  );

  return <Component {...state} onMounted={onMounted} />;
};

export default Container;
