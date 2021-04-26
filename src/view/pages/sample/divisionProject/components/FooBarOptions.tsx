// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FooBarType } from 'src/store/state/domain/sample/divisionProjects/types';
import Options from 'src/view/components/molecules/Options';

const FooBarOptions: FC = () => {
  const { t } = useTranslation();
  const objects = [
    {
      value: FooBarType.Foo,
      display: t('Foo'),
    },
    {
      value: FooBarType.Bar,
      display: t('Bar'),
    },
  ];

  return <Options objects={objects} display="display" value="value" />;
};

export default FooBarOptions;
