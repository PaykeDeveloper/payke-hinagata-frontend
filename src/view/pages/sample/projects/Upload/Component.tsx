// FIXME: SAMPLE CODE

import React, { FC } from 'react';
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
  divisionPath: DivisionPath;
  division: Division | undefined;
  methods: UploadMethods<UploadProjectInput>;
}> = (props) => {
  const { divisionPath, division, methods } = props;
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
        <DownloadButtons divisionPath={divisionPath} methods={methods} />
        <UploadDataGrid methods={methods} />
      </ContentBody>
    </ContentWrapper>
  );
};
export default Component;
