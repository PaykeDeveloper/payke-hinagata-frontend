// FIXME: SAMPLE CODE

import { ComponentProps, FC, useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { Trans } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreSelector } from 'src/store';
import {
  canCreateDivisionSelector,
  divisionsErrorSelector,
  divisionsSelector,
  divisionsStatusSelector,
  checkEditDivisionSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import {
  divisionNewPath,
  getDivisionEditPath,
  getProjectsPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    divisionsSelector,
    divisionsStatusSelector,
    divisionsErrorSelector,
    canCreateDivisionSelector,
    checkEditDivisionSelector,
  ],
  (divisions, status, error, canCreate, checkEdit) => ({
    divisions,
    status,
    error,
    canCreate,
    checkEdit,
  })
);

const List: FC<RouteComponentProps> = (props) => {
  const {
    location: { pathname, search },
  } = props;

  const path = joinString(pathname, search);

  const addTo: ChildProps['addTo'] = useMemo(
    () => ({
      pathname: divisionNewPath,
      state: { path } as RouterState,
    }),
    [path]
  );

  const { canCreate, checkEdit, ...otherState } = useStoreSelector(selector);

  const actions: ChildProps['actions'] = [
    {
      children: <Trans>Edit</Trans>,
      getTo: ({ id }) =>
        checkEdit(id)
          ? {
              pathname: getDivisionEditPath({ divisionId: `${id}` }),
              state: { path } as RouterState,
            }
          : undefined,
    },
    {
      children: <Trans>Show</Trans>,
      getTo: ({ id }) => ({
        pathname: getProjectsPath({ divisionId: `${id}` }),
        state: { path } as RouterState,
      }),
    },
  ];

  return (
    <Component
      {...otherState}
      actions={actions}
      addTo={canCreate ? addTo : undefined}
    />
  );
};

export default List;
