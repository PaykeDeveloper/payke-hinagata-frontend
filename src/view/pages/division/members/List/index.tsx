// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreSelector } from 'src/store';
import { userIdMapSelector } from 'src/store/state/domain/common/users/selectors';
import { divisionSelector } from 'src/store/state/domain/division/divisions/selectors';
import {
  membersStatusSelector,
  membersErrorSelector,
  canCreateMemberSelector,
  membersSelector,
  checkEditMemberSelector,
} from 'src/store/state/domain/division/members/selectors';
import {
  DivisionPath,
  getMemberNewPath,
  getMemberEditPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    membersSelector,
    membersStatusSelector,
    membersErrorSelector,
    userIdMapSelector,
    divisionSelector,
    canCreateMemberSelector,
    checkEditMemberSelector,
  ],
  (members, status, error, userIdMap, division, canCreate, checkEdit) => ({
    members,
    status,
    error,
    userIdMap,
    division,
    canCreate,
    checkEdit,
  })
);

const List: FC<
  RouteComponentProps<DivisionPath, StaticContext, RouterState>
> = (props) => {
  const {
    history: { push },
    match: { params: pathParams },
    location,
  } = props;

  const path = joinString(location.pathname, location.search);

  const onClickAdd: ChildProps['onClickAdd'] = useCallback(
    () =>
      push(getMemberNewPath(pathParams), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  const onClickEdit: ChildProps['onClickEdit'] = useCallback(
    (memberId) =>
      push(getMemberEditPath({ ...pathParams, memberId: `${memberId}` }), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  const { canCreate, ...otherState } = useStoreSelector(selector);

  return (
    <Component
      {...otherState}
      onClickAdd={canCreate ? onClickAdd : undefined}
      onClickEdit={onClickEdit}
    />
  );
};

export default List;
