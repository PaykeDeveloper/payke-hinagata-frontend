import React, { FC } from 'react';

import { BoxProps } from '@material-ui/core';
import Box from '@material-ui/core/Box';

interface Props {
  boxProps?: BoxProps;
}

const ContentBody: FC<Props> = (props) => {
  const { children, boxProps } = props;
  return <Box {...boxProps}>{children}</Box>;
};

ContentBody.defaultProps = {
  boxProps: { mt: 4, mb: 4 },
};

export default ContentBody;
