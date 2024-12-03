import { fn } from '@storybook/test';
import { AddCardButton } from './AddCardButton';

const ActionData = {
    onClick: fn(),
};

export default {
  title: 'Components/Buttons/AddCardButton',
  component: AddCardButton,
  tags: ['autodocs'],
  args: {
    ...ActionData,
  },
};

export const Default = {};
