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
import { objectToInputs } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { deletePermissionCheckSelector } from 'src/store/state/domain/common/permissions/selectors';
import {
  divisionMemberErrorSelector,
  divisionMemberSelector,
  divisionMemberStatusSelector,
} from 'src/store/state/domain/sample/divisionMembers/selectors';
import { divisionMembersActions } from 'src/store/state/domain/sample/divisionMembers/slice';
import { divisionSelector } from 'src/store/state/domain/sample/divisions/selectors';
import { DivisionMemberPath, divisionsPath } from 'src/view/routes/paths';
import { BaseRouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    divisionSelector,
    divisionMemberSelector,
    divisionMemberStatusSelector,
    divisionMemberErrorSelector,
    deletePermissionCheckSelector,
  ],
  (division, divisionMember, status, error, hasDeletePermission) => ({
    division,
    divisionMember,
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

const rules = {} as const;

const Container: FC<
  RouteComponentProps<
    DivisionMemberPath,
    StaticContext,
    DivisionEditRouterState
  >
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
    dispatch(
      divisionMembersActions.fetchEntityIfNeeded({ pathParams, reset: true })
    );
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        divisionMembersActions.mergeEntity({ pathParams, bodyParams })
      );
      if (divisionMembersActions.mergeEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const { divisionMember, ...otherState } = useStoreSelector(selector);

  const fromShow = location.state?.fromShow;
  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(
      divisionMembersActions.removeEntity({ pathParams })
    );
    if (divisionMembersActions.removeEntity.fulfilled.match(action)) {
      if (fromShow) {
        push(divisionsPath);
      } else {
        onBack();
      }
    }
    return action;
  }, [dispatch, pathParams, onBack, push, fromShow]);

  const object = useMemo(
    () => divisionMember && objectToInputs(divisionMember, rules),
    [divisionMember]
  );

  return (
    <Form
      {...otherState}
      title="Edit member"
      object={object}
      divisionMember={divisionMember}
      onSubmit={onSubmit}
      onBack={onBack}
      onDelete={onDelete}
    />
  );
};

export default Container;
