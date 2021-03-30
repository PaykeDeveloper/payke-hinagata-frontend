// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  bookImportCsvErrorSelector,
  bookImportCsvSelector,
  bookImportCsvStatusSelector,
} from 'src/store/state/domain/sample/bookImportCsvs/selectors';
import { bookImportCsvsActions } from 'src/store/state/domain/sample/bookImportCsvs/slice';
import { BookImportCsvPath, bookImportCsvsPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    bookImportCsvSelector,
    bookImportCsvStatusSelector,
    bookImportCsvErrorSelector,
  ],
  (bookImportCsv, bookImportCsvStatus, bookImportCsvError) => ({
    bookImportCsv: bookImportCsv,
    bookImportCsvStatus: bookImportCsvStatus,
    errors: [bookImportCsvError],
  })
);

const Show: FC<
  RouteComponentProps<BookImportCsvPath, StaticContext, RouterState>
> = (props) => {
  const {
    history: { push },
    match: { params: pathParams },
    location,
  } = props;

  const backPath = location.state?.path || bookImportCsvsPath;
  const onBack: ChildProps['onBack'] = useCallback(() => push(backPath), [
    push,
    backPath,
  ]);

  const dispatch = useStoreDispatch();
  useEffect(() => {
    const reset = true;
    dispatch(bookImportCsvsActions.fetchEntityIfNeeded({ pathParams, reset }));
  }, [dispatch, pathParams]);

  const path = joinString(location.pathname, location.search);

  const state = useStoreSelector(selector);

  return <Component {...state} onBack={onBack} />;
};

export default Show;
