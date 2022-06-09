import { Meta, Story } from '@storybook/react';
import Logo, { LogoProps } from 'src/view/components/atoms/Logo';

export default {
  title: 'Logo',
  component: Logo,
} as Meta;

const Template: Story<LogoProps> = (props) => <Logo {...props} />;

export const Default = Template.bind({});
Default.args = {
  className: 'test-class',
};
