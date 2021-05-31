// FIXME: SAMPLE CODE

import React, { useRef, useCallback } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';

export type FileUploadButtonProps = Omit<
  ButtonProps,
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
      <Button onClick={fileUpload} {...otherProps}>
        {children}
      </Button>
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

export default FileUploadButton;
