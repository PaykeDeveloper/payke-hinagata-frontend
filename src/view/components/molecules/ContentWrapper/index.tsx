import React, { FC } from 'react';

import { Container, ContainerProps } from '@material-ui/core';

interface Props extends ContainerProps {}

const ContentWrapper: FC<Props> = (props) => {
  const { children, ...otherProps } = props;
  return <Container {...otherProps}>{children}</Container>;
};

ContentWrapper.defaultProps = {
  maxWidth: 'xl',
};

export default ContentWrapper;
