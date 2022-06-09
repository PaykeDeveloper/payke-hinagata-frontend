import { FC, ReactElement } from 'react';
import { Box, BoxProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { notUndefined } from 'src/base/utils';

const useStyles = makeStyles((theme) => ({
  buttons: {
    overflow: 'hidden',
  },
  leftButton: {
    marginBottom: theme.spacing(0.5),
  },
  leftMargin: {
    marginLeft: theme.spacing(1),
  },
  rightButton: {
    marginBottom: theme.spacing(0.5),
    float: 'right',
  },
  rightMargin: {
    marginRight: theme.spacing(1),
  },
}));

type Props = {
  boxProps?: BoxProps;
  leftButtons?: (ReactElement | undefined)[];
  rightButtons?: (ReactElement | undefined)[];
};

const Buttons: FC<Props> = (props) => {
  const { boxProps, leftButtons, rightButtons } = props;
  const classes = useStyles();
  const filteredLeftButtons = leftButtons?.filter(notUndefined);
  const filteredRightButtons = rightButtons?.filter(notUndefined);
  return (
    <Box {...boxProps} className={clsx(classes.buttons, boxProps?.className)}>
      {filteredLeftButtons?.map((button, index) => (
        <Box
          display="inline-block"
          key={`left-button-${index}`}
          className={clsx(classes.leftButton, {
            [classes.rightMargin]: index + 1 !== filteredLeftButtons?.length,
          })}
        >
          {button}
        </Box>
      ))}
      {filteredRightButtons?.map((button, index) => (
        <Box
          display="inline-block"
          key={`right-button-${index}`}
          className={clsx(classes.rightButton, {
            [classes.leftMargin]: index + 1 !== filteredRightButtons?.length,
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
