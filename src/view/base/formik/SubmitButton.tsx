import React, { FC } from 'react';

import { useFormikContext } from 'formik';
import BaseButton, {
  SubmitButtonProps,
} from 'src/view/base/material-ui/SubmitButton';

const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { disabled, ...otherProps } = props;
  const { isSubmitting } = useFormikContext();
  return <BaseButton disabled={disabled || isSubmitting} {...otherProps} />;
};

export default SubmitButton;
