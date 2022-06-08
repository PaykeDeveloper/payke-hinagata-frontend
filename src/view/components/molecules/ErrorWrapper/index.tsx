import { FC } from 'react';
import { Box, Button, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import { notUndefined } from 'src/base/utils';
import { StoreError } from 'src/store/types';
import { getErrorMessage } from 'src/store/utils';
import ErrorMessage from 'src/view/components/molecules/ErrorMessage';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

type Props = {
  onButtonClick?: () => void;
} & (
  | {
      error: StoreError | undefined;
    }
  | {
      errors: (StoreError | undefined)[];
    }
);

const ErrorWrapper: FC<Props> = (props) => {
  const { children, onButtonClick } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const error =
    'error' in props ? props.error : props.errors.filter(notUndefined)[0];

  if (!error) {
    return <>{children}</>;
  }

  const handleClick =
    onButtonClick ??
    (() => {
      window.location.reload();
    });

  const message = getErrorMessage(error);
  return (
    <Container maxWidth="sm" className={classes.container}>
      <ErrorMessage message={message} />
      <Box mt={4} display="flex" justifyContent="center">
        <Button variant="outlined" onClick={handleClick}>
          {t('Reload')}
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorWrapper;
