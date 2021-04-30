// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import { Button, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { TransitionProps } from '@material-ui/core/transitions';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { BookInput } from 'src/store/state/domain/sample/books/types';
import {
  bookImportersSelector,
  filterErrorImporters,
  bookImporterFinishedSelecotr,
  bookImporterTotalSelecotr,
} from 'src/store/state/ui/sample/books/selectors';
import { bookImportersActions } from 'src/store/state/ui/sample/books/slice';
import { StoreError } from 'src/store/types';
import { readCsv, exportToCsv } from 'src/store/utils/csvParser';
import { CloseIcon } from 'src/view/base/material-ui/Icon';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import { CsvParseResults } from './CsvParseResults';
import { CsvUploadForm } from './CsvUploadForm';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type FormProps = ComponentProps<typeof CsvUploadForm>;
type ListProps = ComponentProps<typeof CsvParseResults>;

const selector = createSelector([bookImportersSelector], (importers) => ({
  importers,
}));

const progresSelector = createSelector(
  [bookImporterFinishedSelecotr, bookImporterTotalSelecotr],
  (finished, total) => ({
    finished,
    total,
  })
);

const ImportProgress: FC = () => {
  console.log('render ImportProgress');
  const state = useStoreSelector(progresSelector);
  const { total, finished } = state;
  const [progress, setProgress] = React.useState<number | undefined>(undefined);
  React.useEffect(() => {
    if (total !== undefined && finished !== undefined) {
      setProgress((finished / total) * 100);
    } else {
      setProgress(undefined);
    }
  }, [setProgress, total, finished]);
  if (progress) {
    return <LinearProgress variant="determinate" value={progress} />;
  } else {
    return <></>;
  }
};

const Importer: FC = (): JSX.Element => {
  console.log('render Importer');
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const state = useStoreSelector(selector);
  const error: StoreError | undefined = undefined;
  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const dispatch = useStoreDispatch();
  const handleSubmit: FormProps['onSubmit'] = useCallback(
    async (values) => {
      const data = await readCsv<BookInput>(values.csv_file);
      dispatch(bookImportersActions.setImporters(data));
    },
    [dispatch]
  );
  const handleImport: ListProps['onStartImport'] = useCallback(async () => {
    dispatch(bookImportersActions.startImport());
  }, [dispatch]);
  const handleClear: ListProps['onReset'] = useCallback(async () => {
    dispatch(bookImportersActions.resetImporters());
  }, [dispatch]);
  const results = useStoreSelector(filterErrorImporters);
  const handlerDownloadErrors: ListProps['onDownloadErrors'] = useCallback(async () => {
    exportToCsv(
      'errors.csv',
      results.map((result) => {
        return {
          book_id: result.book.id ?? '',
          title: result.book.title ?? '',
          author: result.book.author ?? '',
          releaseDate: result.book.releaseDate ?? '',
        };
      })
    );
  }, [results]);
  const { importers } = state;
  const enableParse = importers.length === 0;
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {t('Books Importer')}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {t('Books Importer')}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <CsvUploadForm
            onSubmit={handleSubmit}
            error={error}
            enableParse={enableParse}
          />
          <CsvParseResults
            {...state}
            onStartImport={handleImport}
            onReset={handleClear}
            onDownloadErrors={handlerDownloadErrors}
          >
            <ImportProgress />
          </CsvParseResults>
        </Container>
      </Dialog>
    </div>
  );
};

export default Importer;
