import { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { ErrorOutlineIcon } from 'src/view/base/material-ui/Icon';

const ErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  fontSize: theme.spacing(10),
}));

export interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const { message } = props;
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <ErrorIcon color="error" />
      </Box>
      <Box display="flex" justifyContent="center" mt={1}>
        <Typography variant="h4">{message}</Typography>
      </Box>
    </Box>
  );
};

export default ErrorMessage;
