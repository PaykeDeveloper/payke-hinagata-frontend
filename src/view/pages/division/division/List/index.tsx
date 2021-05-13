// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { usersViewPermissionCheckSelector } from 'src/store/state/domain/common/users/selectors';
import {
  divisionsCreatePermissionCheckSelector,
  divisionsErrorSelector,
  divisionsSelector,
  divisionsStatusSelector,
  divisionsUpdatePermissionCheckSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
import { checkViewMembersSelector } from 'src/store/state/domain/division/members/selectors';
import {
  divisionNewPath,
  getDivisionEditPath,
  getProjectsPath,
  getMembersPath,
  getDivisionPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const permissionSelector = createSelector(
  [
    divisionsCreatePermissionCheckSelector,
    divisionsUpdatePermissionCheckSelector,
    usersViewPermissionCheckSelector,
    checkViewMembersSelector,
  ],
  (divisionCreate, divisionUpdate, usersView, membersView) => ({
    divisionCreate,
    divisionUpdate,
    usersView,
    membersView,
  })
);

const selector = createSelector(
  [
    divisionsSelector,
    divisionsStatusSelector,
    divisionsErrorSelector,
    permissionSelector,
  ],
  (divisions, status, error, permission) => ({
    divisions,
    status,
    error,
    permission,
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

  const state = useStoreSelector(selector);

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

  const onClickProjectsShow: ChildProps['onClickProjectsShow'] = useCallback(
    (divisionId) =>
      push(getProjectsPath({ divisionId: `${divisionId}` }), {
        path,
      } as RouterState),
    [push, path]
  );

  const onClickMembersShow: ChildProps['onClickMembersShow'] = useCallback(
    (divisionId) =>
      push(getMembersPath({ divisionId: `${divisionId}` }), {
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
      onClickProjectsShow={onClickProjectsShow}
      onClickMembersShow={onClickMembersShow}
      onClickEdit={onClickEdit}
    />
  );
};

export default List;
