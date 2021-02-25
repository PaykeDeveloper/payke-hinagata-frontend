import React from 'react';
import { Meta, Story } from '@storybook/react';
import Logo, { LogoProps } from 'src/views/components/Logo';

export default {
  title: 'Logo',
  component: Logo,
} as Meta;

const Template: Story<LogoProps> = (props) => <Logo {...props} />;

export const Default = Template.bind({});
Default.args = {
  className: 'test-class',
};
