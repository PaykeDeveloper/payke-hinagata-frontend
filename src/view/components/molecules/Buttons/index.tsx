import React, { FC, ReactElement } from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
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
  leftButtons?: ReactElement[];
  rightButtons?: ReactElement[];
};

const Buttons: FC<Props> = (props) => {
  const { boxProps, leftButtons, rightButtons } = props;
  const classes = useStyles();
  return (
    <Box {...boxProps}>
      {leftButtons?.map((button, index) => (
        <Box
          display="inline-block"
          key={`left-button-${index}`}
          className={clsx(classes.leftButton, {
            [classes.leftMargin]: index > 0,
          })}
        >
          {button}
        </Box>
      ))}
      {rightButtons?.map((button, index) => (
        <Box
          display="inline-block"
          key={`right-button-${index}`}
          className={clsx(classes.rightButton, {
            [classes.rightMargin]: index > 0,
          })}
        >
          {button}
        </Box>
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
