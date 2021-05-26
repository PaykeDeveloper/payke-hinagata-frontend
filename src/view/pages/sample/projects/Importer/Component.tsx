// FIXME: SAMPLE CODE

import React, { FC, ComponentProps } from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StoreStatus } from 'src/store/types';
import {
  TaskIcon,
  DeleteIcon,
  FileDownloadIcon,
  FileUploadIcon,
  NavigateBeforeIcon,
} from 'src/view/base/material-ui/Icon';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import LoaderButton from 'src/view/components/molecules/LoaderButton';
import { DivisionPath, getProjectsPath, rootPath } from 'src/view/routes/paths';
import FileUploadButton from './components/FileUploadButton';
import List from './components/List';

type ChildProps = ComponentProps<typeof List>;

const Component: FC<
  ChildProps & {
    status: StoreStatus;
    divisionPath: DivisionPath;
    onBack: () => void;
    onStartImport: () => void | Promise<unknown>;
    onReset: () => void | Promise<unknown>;
    onDownloadErrors: () => void | Promise<unknown>;
    onInputChange: (value?: File | null) => void | Promise<unknown>;
  }
> = (props) => {
  const {
    status,
    divisionPath,
    onBack,
    onStartImport,
    onReset,
    onDownloadErrors,
    onInputChange,
    importers,
    ...otherProps
  } = props;
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          {
            children: t('Projects'),
            to: getProjectsPath(divisionPath),
          },
        ]}
      >
        {t('Upload CSV')}
      </ContentHeader>
      <ContentBody>
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
              onChange={onInputChange}
              disabled={importers.length !== 0}
              accept={'text/csv'}
              icon={TaskIcon}
            >
              {t('Choose CSV')}
            </FileUploadButton>,
            <LoaderButton
              type="button"
              variant="outlined"
              color="primary"
              startIcon={<FileUploadIcon />}
              onClick={onStartImport}
              disabled={
                importers.length === 0 || status !== StoreStatus.Initial
              }
            >
              {t('Start Upload')}
            </LoaderButton>,
            <LoaderButton
              type="button"
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={onReset}
              disabled={
                importers.length === 0 || status === StoreStatus.Started
              }
            >
              {t('Clear')}
            </LoaderButton>,
            <LoaderButton
              type="button"
              variant="outlined"
              color="default"
              startIcon={<FileDownloadIcon />}
              onClick={onDownloadErrors}
              disabled={status !== StoreStatus.Done}
            >
              {t('Download Error Rows')}
            </LoaderButton>,
          ]}
        />
        <List {...otherProps} importers={importers} />
      </ContentBody>
    </ContentWrapper>
  );
};
export default Component;
