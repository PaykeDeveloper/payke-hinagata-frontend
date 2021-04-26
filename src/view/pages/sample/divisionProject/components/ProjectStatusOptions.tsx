// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectStatus } from 'src/store/state/domain/sample/divisionProjects/types';
import Options from 'src/view/components/molecules/Options';

const ProjectStatusOptions: FC = () => {
  const { t } = useTranslation();

  const objects = Object.keys(ProjectStatus).map((key) => ({
    value: (ProjectStatus as any)[key] as ProjectStatus,
    display: t(key),
  }));

  return <Options objects={objects} display="display" value="value" />;
};

export default ProjectStatusOptions;
