// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  memberRolesSelector,
  rolesStatusSelector,
} from 'src/store/state/domain/common/roles/selectors';
import {
  divisionMembersErrorSelector,
  divisionMembersStatusSelector,
} from 'src/store/state/domain/sample/divisionMembers/selectors';
import { divisionMembersActions } from 'src/store/state/domain/sample/divisionMembers/slice';
import { divisionSelector } from 'src/store/state/domain/sample/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/sample/divisions/slice';
import { DivisionPath, getDivisionPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    divisionSelector,
    divisionMembersStatusSelector,
    memberRolesSelector,
    rolesStatusSelector,
    divisionMembersErrorSelector,
  ],
  (division, memberStatus, memberRoles, rolesStatus, error) => ({
    division,
    statuses: [memberStatus, rolesStatus],
    memberRoles,
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
    async (bodyParams) => {
      const action = await dispatch(
        divisionMembersActions.addEntity({ pathParams, bodyParams })
      );
      if (divisionMembersActions.addEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const state = useStoreSelector(selector);

  console.log(state);

  return (
    <Form
      {...state}
      title="Add member"
      object={undefined}
      divisionMember={undefined}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

export default Container;
