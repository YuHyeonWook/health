import { Meta, StoryFn } from '@storybook/react';
import Button from '@/components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['primary', 'white'],
      },
    },
    children: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<any> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  mode: 'primary',
  children: 'Button',
};

export const White = Template.bind({});
White.args = {
  mode: 'white',
  children: 'White Button',
};

export const Custom = Template.bind({});
Custom.args = {
  mode: 'primary',
  children: 'Custom Button',
  onClick: () => alert('Button clicked!'),
};
