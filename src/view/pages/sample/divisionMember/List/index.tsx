// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { StoreState, useStoreDispatch, useStoreSelector } from 'src/store';
import { PermissionFactory } from 'src/store/state/domain/common/permissions/factories';
import { permissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import {
  divisionMembersErrorSelector,
  divisionMembersSelector,
  divisionMembersStatusSelector,
} from 'src/store/state/domain/sample/divisionMembers/selectors';
import { divisionMembersActions } from 'src/store/state/domain/sample/divisionMembers/slice';
import {
  divisionMemberNewPath,
  DivisionMemberPath,
  getDivisionMemberEditPath,
  getDivisionMemberPath,
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
    divisionMembersSelector,
    divisionMembersStatusSelector,
    divisionMembersErrorSelector,
    createPermissionCheckSelector,
    updatePermissionCheckSelector,
  ],
  (members, status, error, hasCreatePermission, hasUpdatePermission) => ({
    members,
    status,
    error,
    hasCreatePermission,
    hasUpdatePermission,
  })
);

const List: FC<
  RouteComponentProps<DivisionMemberPath, StaticContext, RouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location: { pathname, search },
  } = props;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(
      divisionMembersActions.fetchEntitiesIfNeeded({
        pathParams: {
          divisionId: pathParams.divisionId,
        },
      })
    );
  }, [dispatch, pathParams.divisionId]);

  const state = useStoreSelector((s) =>
    selector(s, {
      updatePermissionNames: PermissionFactory.UpdateOwnAll('member'),
      createPermissionNames: PermissionFactory.CreateOwnAll('member'),
    })
  );

  const path = joinString(pathname, search);

  const onClickAdd: ChildProps['onClickAdd'] = useCallback(
    () => push(divisionMemberNewPath, { path } as RouterState),
    [push, path]
  );

  const onClickShow: ChildProps['onClickShow'] = useCallback(
    (memberId) =>
      push(
        getDivisionMemberPath({
          divisionId: `${pathParams.divisionId}`,
          memberId: `${memberId}`,
        }),
        {
          path,
        } as RouterState
      ),
    [push, pathParams.divisionId, path]
  );

  const onClickEdit: ChildProps['onClickEdit'] = useCallback(
    (memberId) =>
      push(
        getDivisionMemberEditPath({
          divisionId: `${pathParams.divisionId}`,
          memberId: `${memberId}`,
        }),
        {
          path,
        } as RouterState
      ),
    [push, pathParams.divisionId, path]
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
