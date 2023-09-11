import { FC, ReactNode, useCallback } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormHelperText,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import { Property } from 'csstype';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { Trans } from 'react-i18next';
import { AddIcon, CloseIcon } from 'src/view/base/material-ui/Icon';

const StyledCardContent = styled(CardContent)({
  height: '100%',
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const StyledDiv = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));
const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
});

export type ImageFieldProps = {
  image?: string;
  helperText?: ReactNode;
  error?: boolean;
  onChange?: (file: File | null) => void;
  disabled?: boolean;

  maxWidth?: Property.MaxWidth<number>;
  height?: Property.Height<number>;
  maxHeight?: Property.MaxHeight<number>;
  minHeight?: Property.MinHeight<number>;
  objectFit?: Property.ObjectFit;
};

const emptyCallback = () => undefined;

const ImageField: FC<ImageFieldProps> = (props) => {
  const {
    image,
    helperText,
    error,
    onChange,
    disabled,
    maxWidth,
    height,
    maxHeight,
    minHeight,
    objectFit,
  } = props;

  const handleChange = onChange || emptyCallback;
  const onDrop: NonNullable<DropzoneOptions['onDrop']> = useCallback(
    (acceptedFiles) => handleChange(acceptedFiles[0] ?? null),
    [handleChange],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
  });

  const children = image ? (
    <>
      <CardMedia
        component="img"
        image={image}
        sx={{
          height: height && '100%',
          objectFit,
        }}
      />
      <StyledIconButton
        size="small"
        onClick={(event) => {
          event.stopPropagation();
          handleChange(null);
        }}
      >
        <CloseIcon />
      </StyledIconButton>
    </>
  ) : (
    <StyledCardContent>
      <StyledDiv>
        <Typography variant="h5" align="center">
          <AddIcon />
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <Trans>Drag & drop or click here to add file</Trans>
        </Typography>
      </StyledDiv>
    </StyledCardContent>
  );
  const { style, ...otherRootProps } = getRootProps();
  return (
    <Card sx={{ maxWidth }}>
      <CardActionArea disabled={disabled}>
        <div
          style={{ height, maxHeight, minHeight, ...style }}
          {...otherRootProps}
        >
          <input {...getInputProps()} />
          {children}
          {helperText && (
            <FormHelperText error={error}>{helperText}</FormHelperText>
          )}
        </div>
      </CardActionArea>
    </Card>
  );
};

export default ImageField;
