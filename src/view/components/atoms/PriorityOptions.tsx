// FIXME: SAMPLE CODE

import { FC } from 'react';
import i18next from 'i18next';
import { Priority } from 'src/store/state/domain/sample/projects/types';
import Options from 'src/view/components/molecules/Options';

export const getPriorityLabel = (
  value: Priority | undefined,
  defaultMessage = '',
) => {
  switch (value) {
    case Priority.High:
      return i18next.t('High');
    case Priority.Middle:
      return i18next.t('Middle');
    case Priority.Low:
      return i18next.t('Low');
    default:
      return defaultMessage;
  }
};

export const getPriorityOptions = () =>
  Object.values(Priority).map((value) => ({
    value,
    label: getPriorityLabel(value),
  }));

const PriorityOptions: FC = () => {
  const objects = getPriorityOptions();
  return <Options objects={objects} display="label" value="value" />;
};

export default PriorityOptions;
