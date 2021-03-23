import { FC } from 'react';
import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { notUndefined } from 'src/base/utils';
import { StoreError } from 'src/store/types';
import {
  isNotFoundError,
  isInternalServerError,
  isUnauthorizedError,
} from 'src/store/utils';
import ErrorMessage, {
  ErrorMessageProps,
} from 'src/view/components/molecules/ErrorMessage';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

type Props =
  | {
      error: StoreError | undefined;
    }
  | {
      errors: (StoreError | undefined)[];
    };

const ErrorWrapper: FC<Props> = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const error =
    'error' in props ? props.error : props.errors.filter(notUndefined)[0];

  if (!error) {
    return <>{children}</>;
  }

  let messageProps: ErrorMessageProps;

  if (isNotFoundError(error)) {
    messageProps = { title: `${error.status}`, message: t('Page not found') };
  } else if (isUnauthorizedError(error)) {
    messageProps = { title: `${error.status}`, message: t('Unauthorized') };
  } else if (isInternalServerError(error)) {
    messageProps = {
      title: `${error.status}`,
      message: t('Internal server error'),
    };
  } else {
    messageProps = {
      title: 'Unknown error',
      message: t('An unknown error has occurred.'),
    };
  }

  const onClick = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <ErrorMessage {...messageProps} />
      <Box mt={4} display="flex" justifyContent="center">
        <Button variant="outlined" onClick={onClick}>
          {t('Reload')}
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorWrapper;
