// FIXME: SAMPLE CODE

import { ComponentProps, FC } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { Trans } from 'react-i18next';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreSelector } from 'src/store';
import { userIdMapSelector } from 'src/store/state/domain/common/users/selectors';
import { divisionSelector } from 'src/store/state/domain/division/divisions/selectors';
import {
  canCreateMemberSelector,
  checkEditMemberSelector,
  membersErrorSelector,
  membersSelector,
  membersStatusSelector,
} from 'src/store/state/domain/division/members/selectors';
import {
  DivisionPath,
  getMemberEditPath,
  getMemberNewPath,
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
  }),
);

const List: FC<
  RouteComponentProps<DivisionPath, StaticContext, RouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    location,
  } = props;

  const path = joinString(location.pathname, location.search);

  const { canCreate, checkEdit, ...otherState } = useStoreSelector(selector);

  const actions: ChildProps['actions'] = [
    {
      children: <Trans>Edit</Trans>,
      getTo: ({ id }) =>
        checkEdit(id)
          ? {
              pathname: getMemberEditPath({ ...pathParams, memberId: `${id}` }),
              state: { path } as RouterState,
            }
          : undefined,
    },
  ];

  const addTo: ChildProps['addTo'] = canCreate
    ? {
        pathname: getMemberNewPath(pathParams),
        state: { path } as RouterState,
      }
    : undefined;

  return <Component {...otherState} actions={actions} addTo={addTo} />;
};

export default List;
