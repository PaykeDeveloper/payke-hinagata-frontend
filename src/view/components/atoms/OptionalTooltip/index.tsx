import React, { CSSProperties, FC, ReactNode } from 'react';
import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props extends Omit<TooltipProps, 'title'> {
  title: ReactNode;
  backgroundColor?: CSSProperties['backgroundColor'];
}

const CustomizeTooltip = styled(
  ({ className, children, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }}>
      {children}
    </Tooltip>
  ),
  {
    shouldForwardProp: (propName) => propName !== 'backgroundColor',
  }
)<{ backgroundColor?: CSSProperties['backgroundColor'] }>(
  ({ backgroundColor }) => ({
    whiteSpace: 'pre-wrap',
    [`& .${tooltipClasses.arrow}`]: backgroundColor && {
      color: backgroundColor,
    },
    [`& .${tooltipClasses.tooltip}`]: backgroundColor && {
      backgroundColor,
    },
  })
);

const OptionalTooltip: FC<Props> = (props) => {
  const { title, children } = props;
  if (!title) {
    return children;
  } else {
    return <CustomizeTooltip {...props} title={title} />;
  }
};

export default OptionalTooltip;
