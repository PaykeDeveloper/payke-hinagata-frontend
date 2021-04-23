// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { TransitionProps } from '@material-ui/core/transitions';
import { GridColumns, GridValueGetterParams } from '@material-ui/data-grid';
import { createSelector } from '@reduxjs/toolkit';
import { parse, ParseResult } from 'papaparse';
import { useTranslation } from 'react-i18next';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { StoreState } from 'src/store';
import { BookInput } from 'src/store/state/domain/sample/books/types';
import {
  bookImportersSelector,
  bookImporterResultsSelector,
} from 'src/store/state/ui/sample/books/selectors';
import { bookImportersActions } from 'src/store/state/ui/sample/books/slice';
import {
  BookImporter,
  ImportStatus,
} from 'src/store/state/ui/sample/books/types';
import { StoreError } from 'src/store/types';
import { BaseFileField } from 'src/view/base/formik/FileField';
import { BaseForm } from 'src/view/base/formik/Form';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { OnSubmit } from 'src/view/base/formik/types';
import { dateColDef, RouterDataGrid } from 'src/view/base/material-ui/DataGrid';
import { CloseIcon } from 'src/view/base/material-ui/Icon';
import Loader from 'src/view/components/atoms/Loader';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import * as yup from 'yup';

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

const CsvUploadForm: FC<{
  error: StoreError | undefined;
  onSubmit: OnSubmit<{ csv_file: File }>;
  onStartImport: () => void;
  onReset: () => void;
}> = (props) => {
  console.log('render CsvUploadForm!!');
  const { error, onSubmit, onStartImport, onReset } = props;
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentBody>
        <ErrorWrapper error={error}>
          <Box mt={3}>
            <BaseForm
              initialValues={undefined}
              onSubmit={onSubmit}
              validationSchema={yup.object({
                csv_file: yup
                  .mixed()
                  .label(t('CsvFile'))
                  .required(t('A file is required'))
                  .test(
                    'fileFormat',
                    t('Unsupported Format'),
                    (value) => value && SUPPORTED_FORMATS.includes(value.type)
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
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    {t('Parse CSV')}
                  </Button>
                </CardActions>
              </Card>
            </BaseForm>
          </Box>
          <Box mt={3}>
            <Card>
              <CardActions>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={onStartImport}
                >
                  {t('Start Import')}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={onReset}
                >
                  {t('Clean')}
                </Button>
              </CardActions>
              <CardContent>
                <ChildB />
              </CardContent>
            </Card>
          </Box>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

const importersSelector = createSelector(
  [bookImportersSelector],
  (importers) => ({ importers })
);

const importResultsSelector = createSelector(
  bookImporterResultsSelector,
  (_: StoreState, id: string) => id,
  (importResults, id) => importResults[id]
);

const ChildC: FC<{ rowId: string }> = ({ rowId }) => {
  const result = useStoreSelector((s) => importResultsSelector(s, rowId));
  console.log('render ChildC:' + rowId + ' results => ' + result?.status);
  return (
    <div>
      <div>RootB: {result?.status}</div>
    </div>
  );
};

const ChildB: FC = () => {
  console.log('render ChildB');
  const { t } = useTranslation();
  const { importers } = useStoreSelector(importersSelector);
  const columns: GridColumns = [
    { field: 'id', hide: true },
    {
      field: 'status',
      renderCell: ({ row }) => {
        return <ChildC rowId={row['id'].toString()} />;
      },
    },
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
  return (
    <Box mt={1}>
      <RouterDataGrid columns={columns} rows={importers} pageSize={20} />
    </Box>
  );
};

type ChildProps = ComponentProps<typeof CsvUploadForm>;

const readCsv = (file: File) => {
  return new Promise<BookInput[]>((resolve, reject) => {
    parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (rows: ParseResult<BookInput>) => {
        resolve(rows.data);
      },
    });
  });
};

const Importer: FC = (): JSX.Element => {
  console.log('render Importer!!');
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
  const handleSubmit: ChildProps['onSubmit'] = useCallback(
    async (values, helpers) => {
      console.log('handle submit');
      const data = await readCsv(values.csv_file);
      data.forEach((row) => {
        dispatch(bookImportersActions.addImporter(row));
      });
    },
    [dispatch]
  );
  const handleImport: ChildProps['onStartImport'] = useCallback(async () => {
    console.log('start import');
    dispatch(bookImportersActions.startImport());
  }, [dispatch]);
  const handleClear: ChildProps['onReset'] = useCallback(async () => {
    console.log('clear');
    dispatch(bookImportersActions.resetImporters());
  }, [dispatch]);
  const error: StoreError | undefined = undefined;
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
        <CsvUploadForm
          onSubmit={handleSubmit}
          onStartImport={handleImport}
          onReset={handleClear}
          error={error}
        />
      </Dialog>
    </div>
  );
};

export default Importer;
