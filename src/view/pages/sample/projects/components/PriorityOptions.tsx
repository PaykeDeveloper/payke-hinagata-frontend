// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Priority } from 'src/store/state/domain/sample/projects/types';
import Options from 'src/view/components/molecules/Options';

const PriorityOptions: FC = () => {
  const { t } = useTranslation();
  const objects = [
    {
      value: Priority.High,
      display: t('High'),
    },
    {
      value: Priority.Middle,
      display: t('Middle'),
    },
    {
      value: Priority.Low,
      display: t('Low'),
    },
  ];

  return <Options objects={objects} display="display" value="value" />;
};

export default PriorityOptions;
