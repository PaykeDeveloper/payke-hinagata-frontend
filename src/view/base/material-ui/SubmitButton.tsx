import React, { ComponentType, FC } from 'react';

import { Button, ButtonProps, IconProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Trans } from 'react-i18next';
import { SaveIcon } from './Icon';

const useStyles = makeStyles((theme) => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}));

export type SubmitButtonProps = ButtonProps & {
  icon?: ComponentType<IconProps>;
};

const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { children, icon: Icon, ...otherProps } = props;
  const classes = useStyles();
  return (
    <Button {...otherProps}>
      {Icon && <Icon className={classes.leftIcon} />}
      {children}
    </Button>
  );
};
SubmitButton.defaultProps = {
  type: 'submit',
  variant: 'contained',
  size: 'large',
  color: 'primary',
  children: <Trans>Submit</Trans>,
  icon: SaveIcon,
};

export default SubmitButton;
