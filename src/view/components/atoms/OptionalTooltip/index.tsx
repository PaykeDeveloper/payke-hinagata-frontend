import React, { FC } from 'react';
import { Tooltip, TooltipProps } from '@material-ui/core';

interface Props extends Omit<TooltipProps, 'title'> {
  title: TooltipProps['title'] | undefined;
}

const OptionalTooltip: FC<Props> = (props) => {
  const { title, children } = props;
  if (!title) {
    return children;
  } else {
    return <Tooltip {...props} title={title} />;
  }
};

export default OptionalTooltip;
