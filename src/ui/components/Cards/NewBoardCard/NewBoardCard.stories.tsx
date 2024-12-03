import { fn } from '@storybook/test';
import NewBoardCard from './NewBoardCard';

const ActionData = {
    onCreateBoard: fn(),
    onCancel: fn(),
};

export default {
  title: 'Components/Cards/NewBoardCard',
  component: NewBoardCard,
  tags: ['autodocs'],
  args: {
    ...ActionData,
  },
};

export const Default = {};
