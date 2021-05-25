// FIXME: SAMPLE CODE

import React, { FC, ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { StoreStatus } from 'src/store/types';
import {
  CallSplitIcon,
  SaveIcon,
  DeleteIcon,
  DownloadIcon,
} from 'src/view/base/material-ui/Icon';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import LoaderButton from 'src/view/components/molecules/LoaderButton';
import { rootPath } from 'src/view/routes/paths';
import FileUploadButton from './components/FileUploadButton';
import List from './components/List';

type ChildProps = ComponentProps<typeof List>;

const Component: FC<
  ChildProps & {
    status: StoreStatus;
    onStartImport: () => void | Promise<unknown>;
    onReset: () => void | Promise<unknown>;
    onDownloadErrors: () => void | Promise<unknown>;
    onInputChange: (value?: File | null) => void | Promise<unknown>;
  }
> = (props) => {
  const {
    onStartImport,
    onReset,
    onDownloadErrors,
    onInputChange,
    status,
    importers,
    ...otherProps
  } = props;
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentHeader links={[{ children: t('Home'), to: rootPath }]}>
        {t('Books Importer')}
      </ContentHeader>
      <ContentBody>
        <Buttons
          leftButtons={[
            <FileUploadButton
              color="primary"
              variant="outlined"
              onChange={onInputChange}
              disabled={importers.length !== 0}
              accept={'text/csv'}
              icon={CallSplitIcon}
            >
              {t('Choose CSV')}
            </FileUploadButton>,
            <LoaderButton
              type="button"
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={onStartImport}
              disabled={
                importers.length === 0 || status !== StoreStatus.Initial
              }
            >
              {t('Start Import')}
            </LoaderButton>,
            <LoaderButton
              type="button"
              variant="outlined"
              color="secondary"
              size="large"
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
              size="large"
              startIcon={<DownloadIcon />}
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
