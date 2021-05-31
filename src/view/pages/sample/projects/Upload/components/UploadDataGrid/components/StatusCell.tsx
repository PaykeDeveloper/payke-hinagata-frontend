// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { useStoreSelector } from 'src/store';
import { uploadProjectMetaSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import UploadStatusCell from 'src/view/components/atoms/UploadStatusCell';

const StatusCell: FC<{ id: string }> = ({ id }) => {
  const meta = useStoreSelector((s) => uploadProjectMetaSelector(s, { id }));
  if (!meta) {
    return <></>;
  }
  return <UploadStatusCell status={meta.status} />;
};

export default StatusCell;
