// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canCreateDivisionSelector,
  divisionsErrorSelector,
  divisionsStatusSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
import { divisionsPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [divisionsStatusSelector, divisionsErrorSelector, canCreateDivisionSelector],
  (status, error, canCreate) => ({
    status,
    error,
    canCreate,
  })
);

const New: FC<RouteComponentProps<{}, StaticContext, RouterState>> = (
  props
) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;
  const backPath = location.state?.path || divisionsPath;
  const onBack: ChildProps['onBack'] = useCallback(
    () => push(backPath),
    [push, backPath]
  );

  const dispatch = useStoreDispatch();

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        divisionsActions.addEntity({ pathParams, bodyParams })
      );
      if (divisionsActions.addEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const { canCreate, ...otherState } = useStoreSelector(selector);

  return (
    <Form
      {...otherState}
      title="Add division"
      object={undefined}
      disabled={!canCreate}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

export default New;
