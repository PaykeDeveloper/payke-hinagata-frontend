// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { Trans } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { booksActions } from 'src/store/state/domain/sample/books/slice';
import { BookInput } from 'src/store/state/domain/sample/books/types';
import {
  importRowsSelector,
  filterErrorImporters,
  importerStatusSelector,
  finishedRowsSelector,
  totalRowsSelector,
} from 'src/store/state/ui/sample/importers/books/selectors';
import { bookImportersActions } from 'src/store/state/ui/sample/importers/books/slice';
import { StoreStatus } from 'src/store/types';
import { readCsv, exportToCsv } from 'src/store/utils/csvParser';
import Component from './Component';

const selector = createSelector(
  [importRowsSelector, importerStatusSelector],
  (importers, status) => ({
    importers,
    status,
  })
);

const progressSelector = createSelector(
  [importerStatusSelector, finishedRowsSelector, totalRowsSelector],
  (status, finished, total) => ({
    status,
    finished,
    total,
  })
);

const ImportProgress: FC = () => {
  const state = useStoreSelector(progressSelector);
  const { status, total, finished } = state;
  let progress: number | undefined = undefined;
  if (status !== StoreStatus.Initial) {
    if (finished === 0) {
      progress = 0.01;
    } else {
      progress = (finished! / total!) * 100;
    }
  } else {
    progress = undefined;
  }
  if (progress) {
    return <LinearProgress variant="determinate" value={progress} />;
  } else {
    return <></>;
  }
};

export const MAX_FILE_SIZE = 1024 * 1024;
export const SUPPORTED_FORMATS = ['text/csv'];

type ChildProps = ComponentProps<typeof Component>;

const Importer: FC<RouteComponentProps> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useStoreDispatch();
  const state = useStoreSelector(selector);
  const { status, ...otherState } = state;
  const handleSetCsvFile: ChildProps['onInputChange'] = useCallback(
    async (value) => {
      if (!value) {
        return;
      }
      if (!SUPPORTED_FORMATS.includes(value.type)) {
        enqueueSnackbar(<Trans>Unsupported Format</Trans>, {
          variant: 'error',
        });
        return;
      }
      if (value.size > MAX_FILE_SIZE) {
        enqueueSnackbar(<Trans>File too large</Trans>, {
          variant: 'error',
        });
        return;
      }
      const data = await readCsv<BookInput>(value);
      dispatch(bookImportersActions.setImporters(data));
    },
    [dispatch, enqueueSnackbar]
  );
  const handleImport: ChildProps['onStartImport'] = useCallback(async () => {
    try {
      await dispatch(bookImportersActions.startImport());
    } finally {
      enqueueSnackbar(<Trans>finished import</Trans>, {
        variant: 'success',
      });
      dispatch(booksActions.resetEntitiesIfNeeded());
    }
  }, [dispatch, enqueueSnackbar]);
  const handleClear: ChildProps['onReset'] = useCallback(async () => {
    dispatch(bookImportersActions.resetImporters());
  }, [dispatch]);
  const errorResults = useStoreSelector(filterErrorImporters);
  const handlerDownloadErrors: ChildProps['onDownloadErrors'] =
    useCallback(async () => {
      exportToCsv(
        'errors.csv',
        errorResults.map((result) => {
          return {
            book_id: result.book.id ?? '',
            title: result.book.title ?? '',
            author: result.book.author ?? '',
            releaseDate: result.book.releaseDate ?? '',
          };
        })
      );
    }, [errorResults]);
  return (
    <Component
      {...otherState}
      status={status}
      onStartImport={handleImport}
      onReset={handleClear}
      onDownloadErrors={handlerDownloadErrors}
      onInputChange={handleSetCsvFile}
    >
      <ImportProgress />
    </Component>
  );
};

export default Importer;
