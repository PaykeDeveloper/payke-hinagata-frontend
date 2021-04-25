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
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { TransitionProps } from '@material-ui/core/transitions';
import { GridColumns, GridValueGetterParams } from '@material-ui/data-grid';
import { createSelector } from '@reduxjs/toolkit';
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
  ImportResults,
} from 'src/store/state/ui/sample/books/types';
import { StoreError } from 'src/store/types';
import { readCsv } from 'src/store/utils/csvParser';
import { BaseFileField } from 'src/view/base/formik/FileField';
import { BaseForm } from 'src/view/base/formik/Form';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { OnSubmit } from 'src/view/base/formik/types';
import { RouterDataGrid } from 'src/view/base/material-ui/DataGrid';
import {
  CloseIcon,
  BlockIcon,
  CheckIcon,
} from 'src/view/base/material-ui/Icon';
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
}> = (props) => {
  console.log('render CsvUploadForm!!');
  const { error, onSubmit } = props;
  const { t } = useTranslation();
  return (
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
    </ErrorWrapper>
  );
};

const CsvParseResults: FC<{
  onStartImport: () => void;
  onReset: () => void;
  importers: BookImporter[];
}> = (props) => {
  console.log('render CsvParseResults!!');
  const { onStartImport, onReset, ...otherProps } = props;
  const { t } = useTranslation();
  return (
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
          <ChildB {...otherProps} />
        </CardContent>
      </Card>
    </Box>
  );
};

const StatusCell: FC<{ rowId: string }> = ({ rowId }) => {
  const result = useStoreSelector((s) => importResultsSelector(s, rowId));
  console.log('render StatusCell:' + result?.status);
  if (result?.status === ImportStatus.Prepareing) {
    console.log('isLoading');
    return <CircularProgress />;
  } else if (result?.status === ImportStatus.Success) {
    return <CheckIcon color="primary" />;
  } else if (result?.status === ImportStatus.Failed) {
    return <BlockIcon color="error" />;
  }
  return <div></div>;
};

const importResultsSelector = createSelector(
  bookImporterResultsSelector,
  (_: StoreState, id: string) => id,
  (importResults, id) => importResults[id]
);

const ChildB: FC<{
  importers: BookImporter[];
}> = (props) => {
  console.log('render ChildB');
  const { importers } = props;
  const { t } = useTranslation();
  const columns: GridColumns = [
    { field: 'id', hide: true },
    {
      field: 'status',
      renderCell: ({ row }) => {
        return <StatusCell rowId={row['id'].toString()} />;
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
