import React, { FC, ReactNode, useCallback } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormHelperText from '@material-ui/core/FormHelperText';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Property } from 'csstype';
import { useDropzone } from 'react-dropzone';
import { Trans } from 'react-i18next';
import { AddIcon, CloseIcon } from 'src/views/base/material-ui/Icon';

type StyleProps = {
  maxWidth?: Property.MaxWidth<number>;
  height?: Property.Height<number>;
  maxHeight?: Property.MaxHeight<number>;
  minHeight?: Property.MinHeight<number>;
  objectFit?: Property.ObjectFit;
};

const useStyles = makeStyles((theme) => ({
  card: ({ maxWidth }: StyleProps) => ({
    maxWidth,
  }),
  cardActionArea: ({ height, maxHeight, minHeight }: StyleProps) => ({
    height,
    maxHeight,
    minHeight,
  }),
  cardMedia: ({ height, objectFit }: StyleProps) => ({
    height: height && '100%',
    objectFit,
  }),
  cardContent: {
    height: '100%',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContentDiv: {
    padding: theme.spacing(2),
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: theme.palette.divider,
  },
}));

export type ImageFieldProps = StyleProps & {
  image?: string;
  helperText?: ReactNode;
  error?: boolean;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
};

const emptyCallback = () => undefined;

const ImageField: FC<ImageFieldProps> = (props) => {
  const { image, helperText, error, onChange, disabled, ...styleProps } = props;
  const classes = useStyles(styleProps);
  const handleChange = onChange || emptyCallback;
  const onDrop = useCallback(
    (acceptedFiles) => handleChange(acceptedFiles[0]),
    [handleChange]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const children = image ? (
    <>
      <CardMedia component="img" image={image} className={classes.cardMedia} />
      <IconButton
        size="small"
        className={classes.iconButton}
        onClick={(event) => {
          event.stopPropagation();
          handleChange(null);
        }}
      >
        <CloseIcon />
      </IconButton>
    </>
  ) : (
    <CardContent className={classes.cardContent}>
      <div className={classes.cardContentDiv}>
        <Typography variant="h5" align="center">
          <AddIcon />
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <Trans>Drag & drop or click here to add file</Trans>
        </Typography>
      </div>
    </CardContent>
  );
  return (
    <Card className={classes.card}>
      <CardActionArea
        component="div"
        disabled={disabled}
        className={classes.cardActionArea}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {children}
        {helperText && (
          <GridListTileBar
            subtitle={
              <FormHelperText error={error}>{helperText}</FormHelperText>
            }
          />
        )}
      </CardActionArea>
    </Card>
  );
};

export default ImageField;
