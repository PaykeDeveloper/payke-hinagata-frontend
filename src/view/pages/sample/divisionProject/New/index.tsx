// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { inputsToObject } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  divisionProjectsErrorSelector,
  divisionProjectsStatusSelector,
} from 'src/store/state/domain/sample/divisionProjects/selectors';
import { divisionProjectsActions } from 'src/store/state/domain/sample/divisionProjects/slice';
import { divisionSelector } from 'src/store/state/domain/sample/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/sample/divisions/slice';
import { DivisionPath, getDivisionPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    divisionSelector,
    divisionProjectsStatusSelector,
    divisionProjectsErrorSelector,
  ],
  (division, status, error) => ({
    division,
    status,
    error,
  })
);

const Container: FC<
  RouteComponentProps<DivisionPath, StaticContext, RouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;
  const backPath = location.state?.path || getDivisionPath(pathParams);
  const onBack: ChildProps['onBack'] = useCallback(() => push(backPath), [
    push,
    backPath,
  ]);

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(divisionsActions.fetchEntityIfNeeded({ pathParams, reset: true }));
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (params) => {
      const action = await dispatch(
        divisionProjectsActions.addEntity({
          pathParams,
          bodyParams: inputsToObject(params, { approvedAt: 'dateTime' }),
          useFormData: true,
        })
      );
      if (divisionProjectsActions.addEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const state = useStoreSelector(selector);

  return (
    <Form
      {...state}
      title="Add project"
      object={undefined}
      divisionProject={undefined}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

export default Container;
