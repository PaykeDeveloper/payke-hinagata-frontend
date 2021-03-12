/* eslint-disable no-template-curly-in-string */
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const SetLocale: FC = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  yup.setLocale({
    mixed: {
      default: t('${path} is invalid'),
      required: t('${path} is a required field'),
      oneOf: t('${path} must be one of the following values: ${values}'),
      notOneOf: t('${path} must not be one of the following values: ${values}'),
      defined: t('${path} must be defined'),
    },
    string: {
      length: t('${path} must be exactly ${length} characters'),
      min: t('${path} must be at least ${min} characters'),
      max: t('${path} must be at most ${max} characters'),
      matches: t('${path} must match the following: t("${regex}"'),
      email: t('${path} must be a valid email'),
      url: t('${path} must be a valid URL'),
      uuid: t('${path} must be a valid UUID'),
      trim: t('${path} must be a trimmed string'),
      lowercase: t('${path} must be a lowercase string'),
      uppercase: t('${path} must be a upper case string'),
    },
    number: {
      min: t('${path} must be greater than or equal to ${min}'),
      max: t('${path} must be less than or equal to ${max}'),
      lessThan: t('${path} must be less than ${less}'),
      moreThan: t('${path} must be greater than ${more}'),
      positive: t('${path} must be a positive number'),
      negative: t('${path} must be a negative number'),
      integer: t('${path} must be an integer'),
    },
  });

  return <>{children}</>;
};

export default SetLocale;
