// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { useStoreSelector } from 'src/store';
import { uploadProjectMetaSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { UploadRow } from 'src/store/types';
import UploadValueCell, {
  UploadValueCellType,
} from 'src/view/components/atoms/UploadValueCell';

const ValueCell: FC<{
  row: UploadRow<UploadProjectInput>;
  name: keyof UploadProjectInput;
  type?: UploadValueCellType;
}> = ({ row, name, type }) => {
  const meta = useStoreSelector((s) =>
    uploadProjectMetaSelector(s, { id: row.id })
  );
  return (
    <UploadValueCell
      data={row.data}
      name={name}
      type={type}
      error={meta?.error}
    />
  );
};

export default ValueCell;
