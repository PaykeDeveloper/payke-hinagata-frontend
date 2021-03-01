import { FC } from 'react';
import { Link, LinkProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

type Props = LinkProps;

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
  },
});

const BaseLink: FC<Props> = (props) => {
  const { className, ...otherProps } = props;
  const classes = useStyles();
  return <Link {...otherProps} className={clsx(classes.link, className)} />;
};

export default BaseLink;
