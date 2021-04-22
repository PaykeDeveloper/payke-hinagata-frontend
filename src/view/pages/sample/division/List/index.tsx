// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { StoreState, useStoreDispatch, useStoreSelector } from 'src/store';
import { PermissionFactory } from 'src/store/state/domain/common/permissions/factories';
import { permissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import {
  divisionsErrorSelector,
  divisionsSelector,
  divisionsStatusSelector,
} from 'src/store/state/domain/sample/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/sample/divisions/slice';
import {
  divisionNewPath,
  getDivisionEditPath,
  getDivisionPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const updatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (_: StoreState, params: { updatePermissionNames: string[] }) =>
    params.updatePermissionNames,
  (permissionNames, selectedPermissionNames) =>
    selectedPermissionNames.some((e) => permissionNames?.includes(e))
);

const createPermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (_: StoreState, params: { createPermissionNames: string[] }) =>
    params.createPermissionNames,
  (permissionNames, selectedPermissionNames) =>
    selectedPermissionNames.some((e) => permissionNames?.includes(e))
);

const selector = createSelector(
  [
    divisionsSelector,
    divisionsStatusSelector,
    divisionsErrorSelector,
    createPermissionCheckSelector,
    updatePermissionCheckSelector,
  ],
  (divisions, status, error, hasCreatePermission, hasUpdatePermission) => ({
    divisions,
    status,
    error,
    hasCreatePermission,
    hasUpdatePermission,
  })
);

const List: FC<RouteComponentProps> = (props) => {
  const {
    history: { push },
    location: { pathname, search },
  } = props;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(divisionsActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);

  const state = useStoreSelector((s) =>
    selector(s, {
      updatePermissionNames: PermissionFactory.UpdateOwnAll('division'),
      createPermissionNames: PermissionFactory.CreateOwnAll('division'),
    })
  );

  const path = joinString(pathname, search);

  const onClickAdd: ChildProps['onClickAdd'] = useCallback(
    () => push(divisionNewPath, { path } as RouterState),
    [push, path]
  );

  const onClickShow: ChildProps['onClickShow'] = useCallback(
    (divisionId) =>
      push(getDivisionPath({ divisionId: `${divisionId}` }), {
        path,
      } as RouterState),
    [push, path]
  );

  const onClickEdit: ChildProps['onClickEdit'] = useCallback(
    (divisionId) =>
      push(getDivisionEditPath({ divisionId: `${divisionId}` }), {
        path,
      } as RouterState),
    [push, path]
  );

  return (
    <Component
      {...state}
      onClickAdd={onClickAdd}
      onClickShow={onClickShow}
      onClickEdit={onClickEdit}
    />
  );
};

export default List;
