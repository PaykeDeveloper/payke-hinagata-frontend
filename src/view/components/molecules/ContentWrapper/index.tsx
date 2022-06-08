import React, { FC } from 'react';

import { Container, ContainerProps } from '@mui/material';

interface Props extends ContainerProps {}

const ContentWrapper: FC<Props> = (props) => {
  const { children, ...otherProps } = props;
  return <Container {...otherProps}>{children}</Container>;
};

ContentWrapper.defaultProps = {
  maxWidth: 'xl',
};

export default ContentWrapper;
