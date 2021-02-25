import { FormikHelpers } from 'formik';

export type OnSubmit<Values> = (
  values: Values,
  helpers: FormikHelpers<Values>
) => Promise<unknown> | void;
