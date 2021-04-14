import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  invitationsErrorSelector,
  invitationsSelector,
  invitationsStatusSelector,
} from 'src/store/state/domain/common/invitations/selectors';
import { invitationsActions } from 'src/store/state/domain/common/invitations/slice';
import { invitationNewPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [invitationsSelector, invitationsStatusSelector, invitationsErrorSelector],
  (invitations, status, error) => ({ invitations, status, error })
);

const List: FC<RouteComponentProps> = (props) => {
  const {
    history: { push },
    location: { pathname, search },
  } = props;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(invitationsActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);
  const state = useStoreSelector(selector);

  const path = joinString(pathname, search);

  const onClickAdd: ChildProps['onClickAdd'] = useCallback(
    () => push(invitationNewPath, { path } as RouterState),
    [push, path]
  );

  const onClickDelete: ChildProps['onClickDelete'] = useCallback(
    async (invitationId) => {
      if (window.confirm(i18next.t('Are you sure to delete this item?'))) {
        const action = await dispatch(
          invitationsActions.removeEntity({
            pathParams: { invitationId: `${invitationId}` },
          })
        );
        if (invitationsActions.removeEntity.fulfilled.match(action)) {
          await dispatch(
            invitationsActions.fetchEntitiesIfNeeded({ pathParams: {} })
          );
        }
      }
    },
    [dispatch]
  );

  return (
    <Component
      {...state}
      onClickAdd={onClickAdd}
      onClickDelete={onClickDelete}
    />
  );
};

export default List;
