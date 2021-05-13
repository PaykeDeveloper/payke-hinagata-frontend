// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState, useStoreDispatch, useStoreSelector } from 'src/store';
import { userPermissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import {
  divisionPermission,
  divisionErrorSelector,
  divisionSelector,
  divisionStatusSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
import { DivisionPath, divisionsPath } from 'src/view/routes/paths';
import { BaseRouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const permissionCheckSelector = createSelector(
  userPermissionNamesSelector,
  (_: StoreState, params: { permissionNames: string[] }) =>
    params.permissionNames,
  (permissionNames, selectedPermissionNames) =>
    selectedPermissionNames.some((e) => permissionNames?.includes(e))
);

const selector = createSelector(
  [
    divisionSelector,
    divisionStatusSelector,
    divisionErrorSelector,
    permissionCheckSelector,
  ],
  (object, status, error, hasDeletePermission) => ({
    object,
    status,
    error,
    hasDeletePermission,
  })
);

export type DivisionEditRouterState =
  | (BaseRouterState & {
      fromShow: boolean;
    })
  | undefined;

const Edit: FC<
  RouteComponentProps<DivisionPath, StaticContext, DivisionEditRouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;

  const backPath = location.state?.path || divisionsPath;
  const onBack: ChildProps['onBack'] = useCallback(() => push(backPath), [
    push,
    backPath,
  ]);

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(divisionsActions.fetchEntityIfNeeded({ pathParams, reset: true }));
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        divisionsActions.mergeEntity({ pathParams, bodyParams })
      );
      if (divisionsActions.mergeEntity.fulfilled.match(action)) {
        // mergeEntity で削除されるので再取得
        dispatch(
          divisionsActions.fetchEntitiesIfNeeded({ pathParams, reset: true })
        );
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const state = useStoreSelector((s) =>
    selector(s, {
      permissionNames: [
        divisionPermission.deleteOwn,
        divisionPermission.deleteAll,
      ],
    })
  );

  const fromShow = location.state?.fromShow;
  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(
      divisionsActions.removeEntity({ pathParams })
    );
    if (divisionsActions.removeEntity.fulfilled.match(action)) {
      if (fromShow) {
        push(divisionsPath);
      } else {
        onBack();
      }
    }
    return action;
  }, [dispatch, pathParams, onBack, push, fromShow]);

  return (
    <Form
      {...state}
      title="Edit division"
      onSubmit={onSubmit}
      onBack={onBack}
      onDelete={onDelete}
    />
  );
};

export default Edit;
