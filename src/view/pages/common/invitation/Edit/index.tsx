// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  invitationErrorSelector,
  invitationSelector,
  invitationStatusSelector,
} from 'src/store/state/domain/common/invitations/selectors';
import { invitationsActions } from 'src/store/state/domain/common/invitations/slice';
import { getErrorMessage } from 'src/store/utils';
import { InvitationPath, invitationsPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [invitationSelector, invitationStatusSelector, invitationErrorSelector],
  (object, status, error) => ({ object, status, error })
);

const Container: FC<
  RouteComponentProps<InvitationPath, StaticContext, RouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;

  const backPath = location.state?.path || invitationsPath;
  const onBack: ChildProps['onBack'] = useCallback(() => push(backPath), [
    push,
    backPath,
  ]);

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(
      invitationsActions.fetchEntityIfNeeded({ pathParams, reset: true })
    );
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        invitationsActions.mergeEntity({ pathParams, bodyParams })
      );
      if (invitationsActions.mergeEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const state = useStoreSelector(selector);
  const { enqueueSnackbar } = useSnackbar();

  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(
      invitationsActions.removeEntity({ pathParams })
    );
    if (invitationsActions.removeEntity.fulfilled.match(action)) {
      onBack();
    } else if (invitationsActions.removeEntity.rejected.match(action)) {
      if (action.payload) {
        const message = getErrorMessage(action.payload);
        enqueueSnackbar(message, { variant: 'error' });
      }
    }

    return action;
  }, [dispatch, pathParams, onBack, enqueueSnackbar]);

  return (
    <Component
      {...state}
      onSubmit={onSubmit}
      onBack={onBack}
      onDelete={onDelete}
    />
  );
};

export default Container;
