// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import { Button, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
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
  bookImporterStatusSelecotr,
} from 'src/store/state/ui/sample/importers/books/selectors';
import { bookImportersActions } from 'src/store/state/ui/sample/importers/books/slice';
import { StoreError } from 'src/store/types';
import { readCsv, exportToCsv } from 'src/store/utils/csvParser';
import { CloseIcon } from 'src/view/base/material-ui/Icon';
import { CsvParseResults } from './CsvParseResults';
import { CsvUploadForm } from './CsvUploadForm';

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
type ImporterComponentProps = FormProps &
  ListProps & {
    open: boolean;
    handleClose: () => void;
    handleClickOpen: () => void;
  };

const Component: FC<ImporterComponentProps> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { handleClose, handleClickOpen, open, ...otherProps } = props;
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
        <Container fixed>
          <CsvUploadForm {...otherProps} />
          <CsvParseResults {...otherProps} />
        </Container>
      </Dialog>
    </div>
  );
};

const selector = createSelector(
  [bookImportersSelector, bookImporterStatusSelecotr],
  (importers, status) => ({
    importers,
    status,
  })
);

const Importer: FC = (): JSX.Element => {
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
  const errorResults = useStoreSelector(filterErrorImporters);
  const handlerDownloadErrors: ListProps['onDownloadErrors'] = useCallback(async () => {
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
  const { importers } = state;
  const enableParse = importers.length === 0;
  return (
    <Component
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      onSubmit={handleSubmit}
      onStartImport={handleImport}
      onReset={handleClear}
      onDownloadErrors={handlerDownloadErrors}
      open={open}
      error={error}
      enableParse={enableParse}
      {...state}
    />
  );
};

export default Importer;