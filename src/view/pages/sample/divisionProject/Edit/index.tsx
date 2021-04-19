// FIXME: SAMPLE CODE

import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { inputsToObject, objectToInputs } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  divisionProjectErrorSelector,
  divisionProjectSelector,
  divisionProjectStatusSelector,
} from 'src/store/state/domain/sample/divisionProjects/selectors';
import { divisionProjectsActions } from 'src/store/state/domain/sample/divisionProjects/slice';
import { divisionSelector } from 'src/store/state/domain/sample/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/sample/divisions/slice';
import { DivisionProjectPath, getDivisionPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    divisionSelector,
    divisionProjectSelector,
    divisionProjectStatusSelector,
    divisionProjectErrorSelector,
  ],
  (division, divisionProject, status, error) => ({
    division,
    divisionProject,
    status,
    error,
  })
);

const rules = { approvedAt: 'dateTime' } as const;

const Container: FC<
  RouteComponentProps<DivisionProjectPath, StaticContext, RouterState>
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
    const reset = true;
    dispatch(
      divisionsActions.fetchEntityIfNeeded({
        pathParams: { divisionId: pathParams.divisionId },
        reset,
      })
    );
    dispatch(
      divisionProjectsActions.fetchEntityIfNeeded({ pathParams, reset })
    );
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (params) => {
      const action = await dispatch(
        divisionProjectsActions.mergeEntity({
          pathParams,
          bodyParams: inputsToObject(params, rules),
          useFormData: true,
        })
      );
      if (divisionProjectsActions.mergeEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(
      divisionProjectsActions.removeEntity({ pathParams })
    );
    if (divisionProjectsActions.removeEntity.fulfilled.match(action)) {
      onBack();
    }
    return action;
  }, [dispatch, pathParams, onBack]);

  const { divisionProject, ...otherState } = useStoreSelector(selector);
  const object = useMemo(
    () => divisionProject && objectToInputs(divisionProject, rules),
    [divisionProject]
  );

  return (
    <Form
      {...otherState}
      title="Edit comment"
      object={object}
      divisionProject={divisionProject}
      onSubmit={onSubmit}
      onDelete={onDelete}
      onBack={onBack}
    />
  );
};

export default Container;
