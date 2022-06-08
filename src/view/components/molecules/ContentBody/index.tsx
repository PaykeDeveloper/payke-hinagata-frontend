import React, { FC } from 'react';

import { BoxProps } from '@mui/material';
import Box from '@mui/material/Box';

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
