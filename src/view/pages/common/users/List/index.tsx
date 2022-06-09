import React, { ComponentProps, FC } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { Trans } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreSelector } from 'src/store';
import {
  usersErrorSelector,
  usersSelector,
  usersStatusSelector,
  checkEditUserSelector,
} from 'src/store/state/domain/common/users/selectors';
import { getUserEditPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    usersSelector,
    usersStatusSelector,
    usersErrorSelector,
    checkEditUserSelector,
  ],
  (users, status, error, checkEdit) => ({
    users,
    status,
    error,
    checkEdit,
  })
);

const List: FC<RouteComponentProps> = (props) => {
  const {
    location: { pathname, search },
  } = props;

  const path = joinString(pathname, search);

  const { checkEdit, ...otherState } = useStoreSelector(selector);
  const actions: ChildProps['actions'] = [
    {
      children: <Trans>Edit</Trans>,
      getTo: ({ id }) =>
        checkEdit(id)
          ? {
              pathname: getUserEditPath({ userId: `${id}` }),
              state: { path } as RouterState,
            }
          : undefined,
    },
  ];

  return <Component {...otherState} actions={actions} />;
};

export default List;
