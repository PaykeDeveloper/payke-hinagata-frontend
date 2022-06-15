import { FC } from 'react';
import { CircularProgress, styled } from '@mui/material';
import { StoreStatus } from 'src/store/types';
import { checkProcessed } from 'src/store/utils';

const LoaderDiv = styled('div')({
  position: 'relative',
});
const FabProgressDiv = styled('div')(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255,255,255,0.5)'
      : 'rgba(0,0,0,0.5)',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 'auto',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FabProgress: FC<{ side: number }> = ({ side }) => {
  return (
    <FabProgressDiv>
      <CircularProgress size={side} />
    </FabProgressDiv>
  );
};

export type LoaderProps = { size?: number } & (
  | {
      status: StoreStatus;
    }
  | {
      loading: boolean;
    }
  | {
      statuses: StoreStatus[];
    }
);

const Loader: FC<LoaderProps> = (props) => {
  const { children, size } = props;
  const loading = (() => {
    if ('status' in props) {
      return !checkProcessed(props.status);
    } else if ('loading' in props) {
      return props.loading;
    } else if ('statuses' in props) {
      return !props.statuses.every((s) => checkProcessed(s));
    }
  })();
  return (
    <LoaderDiv>
      {children}
      {loading && <FabProgress side={size || 68} />}
    </LoaderDiv>
  );
};

export default Loader;
