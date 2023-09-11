import { ComponentProps, FC, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { Trans } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canCreateInvitationSelector,
  canEditInvitationSelector,
  invitationsErrorSelector,
  invitationsSelector,
  invitationsStatusSelector,
} from 'src/store/state/domain/common/invitations/selectors';
import { invitationsActions } from 'src/store/state/domain/common/invitations/slice';
import {
  getInvitationEditPath,
  invitationNewPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    invitationsSelector,
    invitationsStatusSelector,
    invitationsErrorSelector,
    canCreateInvitationSelector,
    canEditInvitationSelector,
  ],
  (invitations, status, error, canCreate, canEdit) => ({
    invitations,
    status,
    error,
    canCreate,
    canEdit,
  }),
);

const List: FC<RouteComponentProps> = (props) => {
  const {
    location: { pathname, search },
  } = props;
  const path = joinString(pathname, search);
  const { canCreate, canEdit, ...otherState } = useStoreSelector(selector);

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(
      invitationsActions.fetchEntitiesIfNeeded({ pathParams: {}, reset: true }),
    );
  }, [dispatch]);

  const actions: ChildProps['actions'] = [
    {
      children: <Trans>Edit</Trans>,
      getTo: ({ id }) =>
        canEdit
          ? {
              pathname: getInvitationEditPath({ invitationId: `${id}` }),
              state: { path } as RouterState,
            }
          : undefined,
    },
  ];

  const addTo: ChildProps['addTo'] = canCreate
    ? {
        pathname: invitationNewPath,
        state: { path } as RouterState,
      }
    : undefined;

  return <Component {...otherState} actions={actions} addTo={addTo} />;
};

export default List;
