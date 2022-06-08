import { FC, ReactNode } from 'react';
import { Grid, GridProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

const useStyles = makeStyles({
  item: {
    margin: 'auto',
  },
});

interface KeyValue {
  key: ReactNode;
  value: ReactNode;
}

interface Props {
  list: KeyValue[];
  containerProps?: GridProps;
  keyProps?: GridProps;
  valueProps?: GridProps;
}

const DefinitionList: FC<Props> = (props) => {
  const { list, containerProps, keyProps, valueProps } = props;
  const { className: keyClassName, ...otherKeyProps } = keyProps || {};
  const { className: valueClassName, ...otherValueProps } = valueProps || {};
  const classes = useStyles();
  return (
    <>
      {list.map(({ key, value }, index) => (
        <Grid key={index} container spacing={1} {...containerProps}>
          <Grid
            item
            sm={4}
            className={clsx(classes.item, keyClassName)}
            {...otherKeyProps}
          >
            {key}
          </Grid>
          <Grid
            item
            sm={8}
            className={clsx(classes.item, valueClassName)}
            {...otherValueProps}
          >
            {value}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default DefinitionList;
