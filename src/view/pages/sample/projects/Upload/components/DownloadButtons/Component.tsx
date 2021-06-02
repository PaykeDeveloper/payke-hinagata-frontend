// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  DeleteIcon,
  FileDownloadIcon,
  FileUploadIcon,
  NavigateBeforeIcon,
  AddIcon,
  StopIcon,
} from 'src/view/base/material-ui/Icon';
import Buttons from 'src/view/components/molecules/Buttons';
import FileUploadButton from 'src/view/components/molecules/FileUploadButton';
import LoaderButton from 'src/view/components/molecules/LoaderButton';

const Component: FC<{
  onBack: () => void;
  onAddCsv: ((value?: File | null) => Promise<unknown>) | undefined;
  onStartUpload: (() => Promise<unknown>) | undefined;
  onStopUpload: (() => Promise<unknown>) | undefined;
  onClear: (() => Promise<unknown>) | undefined;
  onDownloadErrors: (() => Promise<unknown>) | undefined;
}> = (props) => {
  const {
    onBack,
    onAddCsv,
    onStartUpload,
    onStopUpload,
    onClear,
    onDownloadErrors,
  } = props;
  const { t } = useTranslation();
  const emptyCallback = async () => undefined;
  return (
    <Buttons
      leftButtons={[
        <Button
          onClick={onBack}
          startIcon={<NavigateBeforeIcon />}
          variant="outlined"
        >
          {t('Back')}
        </Button>,
        <FileUploadButton
          id="upload-csv"
          variant="outlined"
          color="primary"
          onChange={onAddCsv || emptyCallback}
          disabled={!onAddCsv}
          accept={'text/csv'}
          startIcon={<AddIcon />}
        >
          {t('Add CSV')}
        </FileUploadButton>,
        <LoaderButton
          variant="outlined"
          color="primary"
          startIcon={<FileUploadIcon />}
          onClick={onStartUpload || emptyCallback}
          disabled={!onStartUpload}
        >
          {t('Start Upload')}
        </LoaderButton>,
        <LoaderButton
          variant="outlined"
          color="secondary"
          startIcon={<StopIcon />}
          onClick={onStopUpload || emptyCallback}
          disabled={!onStopUpload}
        >
          {t('Stop Upload')}
        </LoaderButton>,
        <LoaderButton
          variant="outlined"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={onClear || emptyCallback}
          disabled={!onClear}
        >
          {t('Clear')}
        </LoaderButton>,
        <LoaderButton
          variant="outlined"
          color="default"
          startIcon={<FileDownloadIcon />}
          onClick={onDownloadErrors || emptyCallback}
          disabled={!onDownloadErrors}
        >
          {t('Download Error Rows')}
        </LoaderButton>,
      ]}
    />
  );
};
export default Component;
