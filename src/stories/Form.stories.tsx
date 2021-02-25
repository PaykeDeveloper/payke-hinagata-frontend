import React, { FC } from 'react';

import { Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Meta, Story } from '@storybook/react';
import { BaseForm } from 'src/views/base/formik/Form';
import SubmitButton from 'src/views/base/formik/SubmitButton';
import { BaseTextField } from 'src/views/base/formik/TextField';
import { OnSubmit } from 'src/views/base/formik/types';
import * as yup from 'yup';

type Input = { name?: string };

interface Props {
  object?: Input;
  disabled?: boolean;
  onSubmit: OnSubmit<Input>;
}

const Form: FC<Props> = (props) => {
  const { object, disabled, onSubmit } = props;
  return (
    <BaseForm
      initialValues={object}
      onSubmit={onSubmit}
      validationSchema={yup.object({
        name: yup.string().required().max(10),
      })}
    >
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <BaseTextField
              name="name"
              label="Name"
              disabled={disabled}
              required
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <SubmitButton disabled={disabled} />
      </CardActions>
    </BaseForm>
  );
};

export default {
  title: 'Form',
  component: Form,
} as Meta;

const Template: Story<Props> = (props) => <Form {...props} />;

export const Default = Template.bind({});
Default.args = {
  object: { name: 'abc' },
};
