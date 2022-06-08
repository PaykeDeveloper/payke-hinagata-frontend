import React, { FC } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { Link, LinkProps } from 'react-router-dom';

export type LinkButtonProps = ButtonProps & LinkProps;

const LinkButton: FC<LinkButtonProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Button {...otherProps} {...{ component: Link }}>
      {children}
    </Button>
  );
};

export default LinkButton;
