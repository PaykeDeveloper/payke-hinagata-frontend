import React, { FC } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const UploadProgress: FC<{
  progress: number;
  total: number;
}> = ({ progress, total }) => {
  const value = (progress / total) * 100;
  return <LinearProgress variant="determinate" value={value} />;
};

export default UploadProgress;
