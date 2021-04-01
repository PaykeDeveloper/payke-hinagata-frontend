import { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { ErrorOutlineIcon } from 'src/view/base/material-ui/Icon';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: theme.spacing(14),
  },
}));

export interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const { message } = props;
  const classes = useStyles();
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <ErrorOutlineIcon color="error" className={classes.icon} />
      </Box>
      <Box display="flex" justifyContent="center" mt={1}>
        <Typography variant="h4">{message}</Typography>
      </Box>
    </Box>
  );
};

export default ErrorMessage;
