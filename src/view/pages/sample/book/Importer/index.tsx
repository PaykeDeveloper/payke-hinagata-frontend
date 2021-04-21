// FIXME: SAMPLE CODE

import React, { FC, useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import { GridColumns, GridValueGetterParams } from '@material-ui/data-grid';
import { parse } from 'papaparse';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { StoreError } from 'src/store/types';
import { dateColDef, RouterDataGrid } from 'src/view/base/material-ui/DataGrid';
import { createSelector } from '@reduxjs/toolkit';
import { useGridApiRef } from '@material-ui/data-grid';
import Loader from 'src/view/components/atoms/Loader';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { CloseIcon } from 'src/view/base/material-ui/Icon';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import { BaseFileField } from 'src/view/base/formik/FileField';
import { BaseForm } from 'src/view/base/formik/Form';
import * as yup from 'yup';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import {
  BookImporter,
  ImportStatus,
} from 'src/store/state/ui/sample/books/types';
import { BookInput } from 'src/store/state/domain/sample/books/types';
import { bookImportersSelector } from 'src/store/state/ui/sample/books/selectors';
import { bookImportersActions } from 'src/store/state/ui/sample/books/slice';
import { OnSubmit } from 'src/view/base/formik/types';

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

const MAX_FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = ['text/csv'];

const selector = createSelector([bookImportersSelector], (bookImports) => ({
  bookImports,
}));

const Importer: FC = () => {
  const apiRef = useGridApiRef();
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const errors: (StoreError | undefined)[] = [];
  const columns: GridColumns = [
    { field: 'id', hide: true },
    { field: 'status' },
    {
      field: 'book_id',
      valueGetter: (params: GridValueGetterParams) => params.row.book.id,
    },
    {
      field: 'title',
      valueGetter: (params: GridValueGetterParams) => params.row.book.title,
    },
    {
      field: 'author',
      valueGetter: (params: GridValueGetterParams) => params.row.book.author,
    },
    {
      field: 'releaseDate',
      valueGetter: (params: GridValueGetterParams) =>
        params.row.book.releaseDate,
      headerName: t('Release date'),
    },
  ];
  const state = useStoreSelector(selector);
  const dispatch = useStoreDispatch();
  const handleSubmit: OnSubmit<any> = useCallback(async () => {
    dispatch(bookImportersActions.startImport());
  }, [dispatch, state]);
  const handleChange = useCallback(
    async (values) => {
      if (!values.csv_file) {
        dispatch(bookImportersActions.resetEntities());
        return;
      }
      parse(values.csv_file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (rows: any) => {
          const _books: BookImporter[] = [];
          rows.data.forEach((row: BookInput, index: number) => {
            _books.push({
              id: index + 1,
              status: ImportStatus.Waiting,
              book: row,
            });
          });
          dispatch(bookImportersActions.setImporters(_books));
        },
      });
    },
    [dispatch, state]
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            <ErrorWrapper errors={errors}>
              <Box mt={3}>
                <BaseForm
                  initialValues={undefined}
                  onSubmit={handleSubmit}
                  validate={(values) => handleChange(values)}
                  validationSchema={yup.object({
                    csv_file: yup
                      .mixed()
                      .label(t('CsvFile'))
                      .required(t('A file is required'))
                      .test(
                        'fileFormat',
                        t('Unsupported Format'),
                        (value) =>
                          value && SUPPORTED_FORMATS.includes(value.type)
                      )
                      .test(
                        'fileSize',
                        t('File too large'),
                        (value) => value && value.size <= MAX_FILE_SIZE
                      ),
                  })}
                >
                  <Card>
                    <CardContent>
                      <BaseFileField name="csv_file" label={t('CsvFile')} />
                    </CardContent>
                    <CardActions>
                      <SubmitButton />
                    </CardActions>
                    <CardContent>
                      <Box mt={1}>
                        <RouterDataGrid
                          columns={columns}
                          rows={state.bookImports}
                          pageSize={20}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </BaseForm>
              </Box>
            </ErrorWrapper>
          </ContentBody>
        </ContentWrapper>
      </Dialog>
    </div>
  );
};

export default Importer;
