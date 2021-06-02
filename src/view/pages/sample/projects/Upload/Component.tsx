// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { UploadMethods } from 'src/store/types';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import { DivisionPath, getProjectsPath, rootPath } from 'src/view/routes/paths';
import DownloadButtons from './components/DownloadButtons';
import UploadDataGrid from './components/UploadDataGrid';

const Component: FC<{
  pathname: string;
  divisionPath: DivisionPath;
  division: Division | undefined;
  methods: UploadMethods<UploadProjectInput>;
  disabled: boolean;
}> = (props) => {
  const { pathname, divisionPath, division, methods, disabled } = props;
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: division?.name },
          {
            children: t('Projects'),
            to: getProjectsPath(divisionPath),
          },
        ]}
      >
        {t('Upload CSV')}
      </ContentHeader>
      <ContentBody>
        {disabled ? (
          <Alert severity="warning">
            <AlertTitle>{t('Warning')}</AlertTitle>
            {`${t('Uploading in other Divisions.')} - `}
            <strong>{t('Please wait or stop the upload.')}</strong>
          </Alert>
        ) : (
          <>
            <DownloadButtons
              pathname={pathname}
              divisionPath={divisionPath}
              methods={methods}
            />
            <UploadDataGrid methods={methods} />
          </>
        )}
      </ContentBody>
    </ContentWrapper>
  );
};
export default Component;
