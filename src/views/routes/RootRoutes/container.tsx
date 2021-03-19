import React, { ComponentProps, FC, useCallback } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { statusStatusSelector } from 'src/store/state/app/status/selectors';
import { statusActions } from 'src/store/state/app/status/slice';
import Component from './component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector([statusStatusSelector], (status) => ({
  status,
}));

const Container: FC = () => {
  const state = useStoreSelector(selector);

  const dispatch = useStoreDispatch();
  const onMounted: ChildProps['onMounted'] = useCallback(
    () => dispatch(statusActions.fetchEntityIfNeeded({ pathParams: {} })),
    [dispatch]
  );

  return <Component {...state} onMounted={onMounted} />;
};

export default Container;
