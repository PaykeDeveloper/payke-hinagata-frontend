import React, { useCallback } from 'react';

import { Form, Formik, FormikConfig } from 'formik';

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
        helpers.setErrors(action?.payload?.data);
      }
      return action;
    },
    [onSubmit]
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
