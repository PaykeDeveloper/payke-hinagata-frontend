import { FC, ReactElement } from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import { notUndefined } from 'src/base/utils';

const ContainerBox = styled(Box)({
  overflow: 'hidden',
});
const LeftBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
}));
const RightBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  float: 'right',
}));

type Props = {
  boxProps?: BoxProps;
  leftButtons?: (ReactElement | undefined)[];
  rightButtons?: (ReactElement | undefined)[];
};

const Buttons: FC<Props> = (props) => {
  const { boxProps, leftButtons, rightButtons } = props;
  const filteredLeftButtons = leftButtons?.filter(notUndefined);
  const filteredRightButtons = rightButtons?.filter(notUndefined);
  return (
    <ContainerBox {...boxProps}>
      {filteredLeftButtons?.map((button, index) => (
        <LeftBox
          display="inline-block"
          key={`left-button-${index}`}
          sx={(theme) =>
            index + 1 !== filteredLeftButtons?.length
              ? {
                  marginRight: theme.spacing(1),
                }
              : {}
          }
        >
          {button}
        </LeftBox>
      ))}
      {filteredRightButtons?.map((button, index) => (
        <RightBox
          display="inline-block"
          key={`right-button-${index}`}
          sx={(theme) =>
            index + 1 !== filteredRightButtons?.length
              ? {
                  marginLeft: theme.spacing(1),
                }
              : {}
          }
        >
          {button}
        </RightBox>
      ))}
    </ContainerBox>
  );
};
Buttons.defaultProps = {
  boxProps: {
    mb: 1,
  },
};

export default Buttons;
