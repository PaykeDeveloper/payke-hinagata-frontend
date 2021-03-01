import React, { FC } from 'react';
import { Box, BoxProps, Button, makeStyles } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  leftButton: {},
  leftMargin: {
    marginLeft: theme.spacing(1),
  },
  rightButton: {
    float: 'right',
  },
  rightMargin: {
    marginRight: theme.spacing(1),
  },
}));

type Props = {
  boxProps?: BoxProps;
  leftButtons?: ButtonProps[];
  rightButtons?: ButtonProps[];
};

const Buttons: FC<Props> = (props) => {
  const { boxProps, leftButtons, rightButtons } = props;
  const classes = useStyles();
  return (
    <Box {...boxProps}>
      {leftButtons?.map(({ className, ...otherProps }, index) => (
        <Button
          key={index}
          color="primary"
          variant="outlined"
          className={clsx(
            classes.leftButton,
            { [classes.leftMargin]: index > 0 },
            className
          )}
          {...otherProps}
        />
      ))}
      {rightButtons?.map(({ className, ...otherProps }, index) => (
        <Button
          key={index}
          color="primary"
          variant="outlined"
          className={clsx(
            classes.rightButton,
            { [classes.rightMargin]: index > 0 },
            className
          )}
          {...otherProps}
        />
      ))}
    </Box>
  );
};
Buttons.defaultProps = {
  boxProps: {
    mb: 1,
  },
};

export default Buttons;
