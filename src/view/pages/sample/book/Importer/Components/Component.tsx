import React, { FC, ComponentProps } from 'react';
import { Button, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from 'src/view/base/material-ui/Icon';
import { CsvParseResults } from '../CsvParseResults';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ListProps = ComponentProps<typeof CsvParseResults>;
export type ImporterComponentProps = ListProps & {
  open: boolean;
  handleClose: () => void;
  handleClickOpen: () => void;
};

const Component: FC<ImporterComponentProps> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { handleClose, handleClickOpen, open, ...otherProps } = props;
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {t('Books Importer')}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {t('Books Importer')}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <CsvParseResults {...otherProps} />
        </Container>
      </Dialog>
    </div>
  );
};

export default Component;
