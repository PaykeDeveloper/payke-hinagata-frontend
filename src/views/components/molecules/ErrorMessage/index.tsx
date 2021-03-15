import { FC } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  logoGrid: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
}));

export interface ErrorMessageProps {
  title: string;
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const { title, message } = props;
  const classes = useStyles();
  return (
    <Grid container spacing={1} justify="center" alignItems="center">
      <Grid item xs={12} sm={2} className={classes.logoGrid}>
        <Typography variant="h1">:(</Typography>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h4">{message}</Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorMessage;
