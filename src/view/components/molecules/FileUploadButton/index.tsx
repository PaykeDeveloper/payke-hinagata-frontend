import { FC, useCallback, useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import Loader from 'src/view/components/atoms/Loader';

export type FileUploadButtonProps = Omit<
  ButtonProps,
  'onClick' | 'onChange'
> & {
  id: string;
  accept?: string;
  multiple?: boolean;
  onChange: (value?: FileList | null) => void | Promise<unknown>;
};

const FileUploadButton: FC<FileUploadButtonProps> = (props) => {
  const { id, accept, multiple, children, onChange, disabled, ...otherProps } =
    props;
  const [loading, setLoading] = useState(false);
  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
      await onChange(event.currentTarget.files);
      event.target.value = '';
      setLoading(false);
    },
    [onChange]
  );
  return (
    <>
      <input
        hidden
        type="file"
        id={id}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        disabled={disabled || loading}
      />
      <label htmlFor={id}>
        <Loader loading={loading} size={20}>
          <Button component="span" {...otherProps}>
            {children}
          </Button>
        </Loader>
      </label>
    </>
  );
};

export default FileUploadButton;
