// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { useStoreSelector } from 'src/store';
import { uploadProjectMetaSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import { UploadStatus } from 'src/store/types';
import UploadErrorCell from 'src/view/components/atoms/UploadErrorCell';

const ErrorCell: FC<{ id: string }> = ({ id }) => {
  const meta = useStoreSelector((s) => uploadProjectMetaSelector(s, { id }));
  if (!meta || meta.status !== UploadStatus.Failed || !meta.error) {
    return <></>;
  }
  return <UploadErrorCell error={meta.error} />;
};

export default ErrorCell;
