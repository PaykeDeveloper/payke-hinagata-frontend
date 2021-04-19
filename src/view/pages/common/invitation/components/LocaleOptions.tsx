import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleType } from 'src/store/state/domain/common/invitations/types';
import Options from 'src/view/components/molecules/Options';

const LocaleOptions: FC = () => {
  const { t } = useTranslation();
  const objects = [
    {
      value: LocaleType.English,
      display: t('English'),
    },
    {
      value: LocaleType.Japanese,
      display: t('Japanese'),
    },
  ];

  return <Options objects={objects} display="display" value="value" />;
};

export default LocaleOptions;
