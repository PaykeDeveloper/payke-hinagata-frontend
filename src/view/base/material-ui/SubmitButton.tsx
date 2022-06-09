import { ComponentType, FC } from 'react';
import { Button, ButtonProps, IconProps } from '@mui/material';
import { Trans } from 'react-i18next';
import { SaveIcon } from './Icon';

export type SubmitButtonProps = ButtonProps & {
  icon?: ComponentType<IconProps>;
};

const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { children, icon: Icon, ...otherProps } = props;
  return (
    <Button {...otherProps}>
      {Icon && <Icon sx={(theme) => ({ marginRight: theme.spacing(1) })} />}
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
