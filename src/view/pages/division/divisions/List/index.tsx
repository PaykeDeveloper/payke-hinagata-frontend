// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
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
    history: { push },
    location: { pathname, search },
  } = props;

  const path = joinString(pathname, search);

  const onClickAdd: ChildProps['onClickAdd'] = useCallback(
    () => push(divisionNewPath, { path } as RouterState),
    [push, path]
  );

  const onClickEdit: ChildProps['onClickEdit'] = useCallback(
    (divisionId) =>
      push(getDivisionEditPath({ divisionId: `${divisionId}` }), {
        path,
      } as RouterState),
    [push, path]
  );

  const onClickShow: ChildProps['onClickShow'] = useCallback(
    (divisionId) =>
      push(getProjectsPath({ divisionId: `${divisionId}` }), {
        path,
      } as RouterState),
    [push, path]
  );

  const { canCreate, ...otherState } = useStoreSelector(selector);

  return (
    <Component
      {...otherState}
      onClickAdd={canCreate ? onClickAdd : undefined}
      onClickEdit={onClickEdit}
      onClickShow={onClickShow}
    />
  );
};

export default List;
