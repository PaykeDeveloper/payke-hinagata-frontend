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
import { bookImportersSelector } from 'src/store/state/ui/sample/books/selectors';
import { bookImportersActions } from 'src/store/state/ui/sample/books/slice';
import { StoreError } from 'src/store/types';
import { readCsv } from 'src/store/utils/csvParser';
import { CloseIcon } from 'src/view/base/material-ui/Icon';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
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

const selector = createSelector([bookImportersSelector], (importers) => ({
  importers,
}));

const Importer: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
  const error: StoreError | undefined = undefined;
  const state = useStoreSelector(selector);
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
        <ContentWrapper>
          <ContentBody>
            <CsvUploadForm onSubmit={handleSubmit} error={error} />
            <CsvParseResults
              {...state}
              onStartImport={handleImport}
              onReset={handleClear}
            />
          </ContentBody>
        </ContentWrapper>
      </Dialog>
    </div>
  );
};

export default Importer;
