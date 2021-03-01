import React, { FC, isValidElement, ReactElement, ReactNode } from 'react';
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
  leftButtons?: (ButtonProps | ReactElement)[];
  rightButtons?: (ButtonProps | ReactElement)[];
};

const Buttons: FC<Props> = (props) => {
  const { boxProps, leftButtons, rightButtons } = props;
  const classes = useStyles();
  return (
    <Box {...boxProps}>
      {leftButtons?.map((button, index) => {
        let children: ReactNode;
        if (isValidElement(button)) {
          children = button;
        } else {
          children = (
            <Button
              key={index}
              color="primary"
              variant="outlined"
              {...button}
            />
          );
        }
        return (
          <Box
            display="inline-block"
            className={clsx(classes.leftButton, {
              [classes.leftMargin]: index > 0,
            })}
          >
            {children}
          </Box>
        );
      })}
      {rightButtons?.map((button, index) => {
        let children: ReactNode;
        if (isValidElement(button)) {
          children = button;
        } else {
          children = (
            <Button
              key={index}
              color="primary"
              variant="outlined"
              {...button}
            />
          );
        }
        return (
          <Box
            display="inline-block"
            className={clsx(classes.rightButton, {
              [classes.rightMargin]: index > 0,
            })}
          >
            {children}
          </Box>
        );
      })}
    </Box>
  );
};
Buttons.defaultProps = {
  boxProps: {
    mb: 1,
  },
};

export default Buttons;
