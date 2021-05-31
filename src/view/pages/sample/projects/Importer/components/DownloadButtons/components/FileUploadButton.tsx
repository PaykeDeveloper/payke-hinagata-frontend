// FIXME: SAMPLE CODE

import React, { useRef, useCallback } from 'react';
import { Trans } from 'react-i18next';
import { AttachFileIcon } from 'src/view/base/material-ui/Icon';
import SubmitButton, {
  SubmitButtonProps,
} from 'src/view/base/material-ui/SubmitButton';

export type FileUploadButtonProps = Omit<
  SubmitButtonProps,
  'onClick' | 'onChange'
> & {
  accept?: string;
  onChange: (value?: File | null) => void | Promise<unknown>;
};

function FileUploadButton(props: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onChange, children, accept, ...otherProps } = props;
  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.files !== null) {
        const file = event.currentTarget.files[0];
        await onChange(file);
        inputRef.current!.value = '';
      } else {
        await onChange(event.currentTarget.files);
      }
    },
    [onChange, inputRef]
  );
  const fileUpload = async () => {
    inputRef.current!.click();
  };
  return (
    <>
      <SubmitButton onClick={fileUpload} {...otherProps}>
        {children}
      </SubmitButton>
      <input
        hidden
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
      />
    </>
  );
}
FileUploadButton.defaultProps = {
  type: 'button',
  variant: 'contained',
  size: 'medium',
  color: 'primary',
  children: <Trans>File Upload</Trans>,
  icon: AttachFileIcon,
};

export default FileUploadButton;
