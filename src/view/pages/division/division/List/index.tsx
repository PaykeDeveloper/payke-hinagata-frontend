// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canCreateDivisionsSelector,
  divisionsErrorSelector,
  divisionsSelector,
  divisionsStatusSelector,
  checkUpdateDivisionsSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
import { divisionNewPath, getDivisionEditPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    divisionsSelector,
    divisionsStatusSelector,
    divisionsErrorSelector,
    canCreateDivisionsSelector,
    checkUpdateDivisionsSelector,
  ],
  (divisions, status, error, canCreate, checkUpdate) => ({
    divisions,
    status,
    error,
    canCreate,
    checkUpdate,
  })
);

const List: FC<RouteComponentProps> = (props) => {
  const {
    history: { push },
    location: { pathname, search },
  } = props;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(divisionsActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);

  const state = useStoreSelector(selector);

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

  return (
    <Component {...state} onClickAdd={onClickAdd} onClickEdit={onClickEdit} />
  );
};

export default List;
