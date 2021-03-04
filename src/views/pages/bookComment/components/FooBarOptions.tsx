import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FooBarType } from 'src/state/ducks/domain/bookComments/types';
import Options from 'src/views/components/Options';

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