import { useCallback } from 'react';
import { Form, Formik, FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import {
  getErrorMessage,
  isStoreError,
  isUnprocessableEntityError,
} from 'src/store/utils';
import { WithChildren } from 'src/view/base/types';

type Props<T> = Omit<FormikConfig<T>, 'initialValues'> &
  WithChildren & {
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
        if (isUnprocessableEntityError(payload)) {
          const errors: object = payload.data?.errors ?? {};
          helpers.setErrors(errors);
        }

        if (isStoreError(payload)) {
          const message = getErrorMessage(payload);
          enqueueSnackbar(message, {
            variant: 'error',
          });
        }
      }
      return action;
    },
    [onSubmit, enqueueSnackbar]
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
