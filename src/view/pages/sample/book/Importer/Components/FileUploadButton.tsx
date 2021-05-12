import React, { FC, useRef, useCallback } from 'react';
import SubmitButton, {
  SubmitButtonProps,
} from 'src/view/base/material-ui/SubmitButton';
import { Trans } from 'react-i18next';
import { CallSplitIcon } from 'src/view/base/material-ui/Icon';

export type FileUploadButtonProps = Omit<SubmitButtonProps, 'onClick'> & {
  accept?: string;
  onInputChange: (value?: File) => void | Promise<unknown>;
};

function FileUploadButton(props: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onInputChange, children, accept, ...otherProps } = props;
  const onFileInputChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.files !== null) {
        const file = event.currentTarget.files[0];
        await onInputChange(file);
        inputRef.current!.value = '';
      }
    },
    [onInputChange, inputRef]
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
        onChange={onFileInputChange}
      />
    </>
  );
}
FileUploadButton.defaultProps = {
  type: 'button',
  variant: 'contained',
  size: 'large',
  color: 'primary',
  children: <Trans>File Upload</Trans>,
  icon: CallSplitIcon,
};

export default FileUploadButton;
