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
import LoaderButton from 'src/view/components/molecules/LoaderButton';
import FileUploadButton from './components/FileUploadButton';

const Component: FC<{
  onBack: () => void;
  onAddCsv: (value?: File | null) => Promise<unknown>;
  onStartUpload: (() => Promise<unknown>) | undefined;
  onStopUpload: (() => Promise<unknown>) | undefined;
  onReset: (() => Promise<unknown>) | undefined;
  onDownloadErrors: (() => Promise<unknown>) | undefined;
}> = (props) => {
  const {
    onBack,
    onAddCsv,
    onStartUpload,
    onStopUpload,
    onReset,
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
          color="primary"
          variant="outlined"
          onChange={onAddCsv}
          accept={'text/csv'}
          icon={AddIcon}
        >
          {t('Add CSV')}
        </FileUploadButton>,
        <LoaderButton
          type="button"
          variant="outlined"
          color="primary"
          startIcon={<FileUploadIcon />}
          onClick={onStartUpload || emptyCallback}
          disabled={!onStartUpload}
        >
          {t('Start Upload')}
        </LoaderButton>,
        <LoaderButton
          type="button"
          variant="outlined"
          color="secondary"
          startIcon={<StopIcon />}
          onClick={onStopUpload || emptyCallback}
          disabled={!onStopUpload}
        >
          {t('Stop Upload')}
        </LoaderButton>,
        <LoaderButton
          type="button"
          variant="outlined"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={onReset || emptyCallback}
          disabled={!onStartUpload}
        >
          {t('Clear')}
        </LoaderButton>,
        <LoaderButton
          type="button"
          variant="outlined"
          color="default"
          startIcon={<FileDownloadIcon />}
          onClick={onDownloadErrors || emptyCallback}
          disabled={!onStartUpload}
        >
          {t('Download Error Rows')}
        </LoaderButton>,
      ]}
    />
  );
};
export default Component;
