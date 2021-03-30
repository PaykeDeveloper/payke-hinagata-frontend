// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  bookImportCsvsErrorSelector,
  bookImportCsvsSelector,
  bookImportCsvsStatusSelector,
} from 'src/store/state/domain/sample/bookImportCsvs/selectors';
import { bookImportCsvsActions } from 'src/store/state/domain/sample/bookImportCsvs/slice';
import {
  bookImportCsvNewPath,
  getBookImportCsvPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    bookImportCsvsSelector,
    bookImportCsvsStatusSelector,
    bookImportCsvsErrorSelector,
  ],
  (bookImportCsvs, status, error) => ({ bookImportCsvs, status, error })
);

const List: FC<RouteComponentProps> = (props) => {
  const {
    history: { push },
    location: { pathname, search },
  } = props;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(bookImportCsvsActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);
  const state = useStoreSelector(selector);

  const path = joinString(pathname, search);

  const onClickAdd: ChildProps['onClickAdd'] = useCallback(
    () => push(bookImportCsvNewPath, { path } as RouterState),
    [push, path]
  );

  const onClickShow: ChildProps['onClickShow'] = useCallback(
    (bookImportCsvId) =>
      push(getBookImportCsvPath({ bookImportCsvId: `${bookImportCsvId}` }), {
        path,
      } as RouterState),
    [push, path]
  );

  return (
    <Component {...state} onClickAdd={onClickAdd} onClickShow={onClickShow} />
  );
};

export default List;
