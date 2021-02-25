import React, { FC, useCallback } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import { statusStatusSelector } from 'src/state/ducks/app/status/selectors';
import { statusActions } from 'src/state/ducks/app/status/slice';
import { useReduxDispatch, useReduxSelector } from 'src/state/store';
import Component from './component';

const selector = createSelector([statusStatusSelector], (status) => ({
  status,
}));

const Container: FC = () => {
  const state = useReduxSelector(selector);

  const dispatch = useReduxDispatch();
  const onMounted = useCallback(
    () => dispatch(statusActions.fetchEntityIfNeeded({ pathParams: {} })),
    [dispatch]
  );

  return <Component {...state} onMounted={onMounted} />;
};

export default Container;
