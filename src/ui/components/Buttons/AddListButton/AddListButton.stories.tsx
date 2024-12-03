import { fn } from '@storybook/test';
import { AddListButton } from './AddListButton';

const ActionData = {
    onClick: fn(),
};

export default {
  title: 'Components/Buttons/AddListButton',
  component: AddListButton,
  tags: ['autodocs'],
  args: {
    ...ActionData,
  }
};

export const Default = {};
