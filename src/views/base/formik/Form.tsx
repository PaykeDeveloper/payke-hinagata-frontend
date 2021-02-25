import React, { useCallback } from 'react';

import { Form, Formik, FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { isUnprocessableEntityError } from 'src/state/ducks/utils';

type Props<T> = Omit<FormikConfig<T>, 'initialValues'> & {
  initialValues: T | undefined;
};

const nullTypes = ['number', 'date'];
const shouldCheckEmpty = (key: string) => {
  const elements: (HTMLInputElement | HTMLTextAreaElement)[] = [];
  document.getElementsByName(key).forEach((value) => {
    if (
      value instanceof HTMLInputElement ||
      value instanceof HTMLTextAreaElement
    ) {
      elements.push(value);
    }
  });

  return (
    elements.length > 0 &&
    elements.some((value) => nullTypes.includes(value.type))
  );
};

export const BaseForm = <T extends object>(props: Props<T>) => {
  const { children, initialValues, onSubmit, ...otherProps } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleSubmit: Props<T>['onSubmit'] = useCallback(
    async (values, helpers) => {
      const submitValues: any = { ...values };
      Object.keys(submitValues).forEach((key) => {
        if (shouldCheckEmpty(key) && submitValues[key] === '') {
          submitValues[key] = null;
        }
      });

      const action = await onSubmit(submitValues, helpers);
      if (action?.error) {
        const payload = action?.payload;
        let message = 'Some error occurred.';
        if (isUnprocessableEntityError(payload)) {
          message = payload.data?.message || message;
          helpers.setErrors(payload.data?.errors as T);
        }
        enqueueSnackbar(t(message), {
          variant: 'error',
        });
      }
      return action;
    },
    [onSubmit, enqueueSnackbar, t]
  );

  return (
    <Formik
      initialValues={initialValues || ({} as T)}
      onSubmit={handleSubmit}
      {...otherProps}
    >
      <Form>{children}</Form>
    </Formik>
  );
};
BaseForm.defaultProps = {
  enableReinitialize: true,
};
