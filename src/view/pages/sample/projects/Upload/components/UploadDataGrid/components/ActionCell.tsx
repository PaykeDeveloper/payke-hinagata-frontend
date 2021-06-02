// FIXME: SAMPLE CODE

import React, { FC, useCallback } from 'react';
import { useStoreSelector } from 'src/store';
import { uploadProjectMetaSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import UploadActionCell from 'src/view/components/atoms/UploadActionCell';

const ActionCell: FC<{
  id: string;
  onRestart: (id: string) => void;
  onRemove: (id: string) => void;
}> = ({ id, onRestart, onRemove }) => {
  const meta = useStoreSelector((s) => uploadProjectMetaSelector(s, { id }));
  const handleRestart = useCallback(() => onRestart(id), [id, onRestart]);
  const handleRemove = useCallback(() => onRemove(id), [id, onRemove]);
  if (!meta) {
    return <></>;
  }
  return (
    <UploadActionCell
      status={meta.status}
      onRestart={handleRestart}
      onRemove={handleRemove}
    />
  );
};

export default ActionCell;
