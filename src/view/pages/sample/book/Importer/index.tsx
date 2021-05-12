// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { BookInput } from 'src/store/state/domain/sample/books/types';
import {
  importRowsSelector,
  filterErrorImporters,
  importerStatusSelector,
  finishedRowsSelector,
  totalRowsSelector,
} from 'src/store/state/ui/sample/importers/books/selectors';
import { bookImportersActions } from 'src/store/state/ui/sample/importers/books/slice';
import { readCsv, exportToCsv } from 'src/store/utils/csvParser';
import Component from './Components/Component';
import { StoreStatus } from 'src/store/types';

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
      progress = 1;
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
  const {
    history: { push },
    location: { pathname, search },
  } = props;
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const state = useStoreSelector(selector);
  const dispatch = useStoreDispatch();
  const handleSetCsvFile: ChildProps['onInputChange'] = useCallback(
    async (value) => {
      if (value === undefined) {
        return;
      }
      if (!SUPPORTED_FORMATS.includes(value.type)) {
        enqueueSnackbar(t('Unsupported Format'), {
          variant: 'error',
        });
        return;
      }
      if (value.size > MAX_FILE_SIZE) {
        enqueueSnackbar(t('File too large'), {
          variant: 'error',
        });
        return;
      }
      const data = await readCsv<BookInput>(value);
      dispatch(bookImportersActions.setImporters(data));
    },
    [dispatch, t, enqueueSnackbar]
  );
  const handleImport: ChildProps['onStartImport'] = useCallback(async () => {
    dispatch(bookImportersActions.startImport());
  }, [dispatch]);
  const handleClear: ChildProps['onReset'] = useCallback(async () => {
    dispatch(bookImportersActions.resetImporters());
  }, [dispatch]);
  const errorResults = useStoreSelector(filterErrorImporters);
  const handlerDownloadErrors: ChildProps['onDownloadErrors'] = useCallback(async () => {
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
  const { importers, ...otherState } = state;
  return (
    <Component
      {...otherState}
      onStartImport={handleImport}
      onReset={handleClear}
      onDownloadErrors={handlerDownloadErrors}
      onInputChange={handleSetCsvFile}
      importers={importers}
    />
  );
};

export default Importer;
