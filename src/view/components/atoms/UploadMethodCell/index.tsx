import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadMethod } from 'src/store/types';

const UploadMethodCell: FC<{ method: UploadMethod }> = ({ method }) => {
  const { t } = useTranslation();
  switch (method) {
    case UploadMethod.Add: {
      return <>{t('Create')}</>;
    }
    case UploadMethod.Merge: {
      return <>{t('Update')}</>;
    }
    case UploadMethod.Remove: {
      return <>{t('Delete')}</>;
    }
  }
};

export default UploadMethodCell;
