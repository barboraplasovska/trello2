import { fn } from '@storybook/test';
import { NewListCard } from './NewListCard';

const ActionData = {
    onAddList: fn(),
    onCancel: fn(),
};

export default {
  title: 'Components/Cards/NewListCard',
  component: NewListCard,
  tags: ['autodocs'],
  args: {
    ...ActionData
  }
};

export const Default = {};
