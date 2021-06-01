// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { GridCellValue } from '@material-ui/data-grid';
import { useStoreSelector } from 'src/store';
import { uploadProjectMetaSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import UploadValueCell from 'src/view/components/atoms/UploadValueCell';

const ValueCell: FC<{
  formattedValue: GridCellValue;
  id: string;
  name: keyof UploadProjectInput;
}> = ({ formattedValue, id, name }) => {
  const meta = useStoreSelector((s) => uploadProjectMetaSelector(s, { id }));
  return (
    <UploadValueCell
      formattedValue={formattedValue}
      name={name}
      error={meta?.error}
    />
  );
};

export default ValueCell;
