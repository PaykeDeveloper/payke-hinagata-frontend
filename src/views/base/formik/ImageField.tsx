import React, { FC } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';
import { Trans } from 'react-i18next';
import MuiImageField, {
  ImageFieldProps,
} from 'src/views/base/material-ui/ImageField';

const useStyles = makeStyles((theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
}));

type Props = ImageFieldProps & {
  name: string;
};

const ImageField: FC<Props> = (props) => {
  const { name, helperText, disabled, ...otherProps } = props;
  const { isSubmitting, submitCount } = useFormikContext();
  const [field, meta, helpers] = useField({ name });
  const { value } = field;
  const hasError = !!((meta.touched || submitCount) && meta.error);
  let image: string | undefined;
  if (typeof value === 'string') {
    image = value;
  } else if (value instanceof File) {
    image = URL.createObjectURL(value);
  }
  return (
    <MuiImageField
      image={image}
      error={hasError}
      helperText={meta.error || helperText}
      onChange={(file) => helpers.setValue(file)}
      disabled={disabled || isSubmitting}
      {...otherProps}
    />
  );
};

export default ImageField;

interface BaseImageFieldProps extends Props {
  label: string;
}

export const BaseImageField: FC<BaseImageFieldProps> = (props) => {
  const { label, ...otherProps } = props;
  const classes = useStyles();
  return (
    <>
      <InputLabel htmlFor={otherProps.name} className={classes.label}>
        <Trans>{label}</Trans>
      </InputLabel>
      <ImageField {...otherProps} />
    </>
  );
};
