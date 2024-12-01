import { fn } from '@storybook/test';
import NewBoardCard from './NewBoardCard';

const colors = [
  'A3537A', '5366A3', '57A353', 'A35353',
  '7453A3', 'D29034', '06AECC', '838C91'
];

const ActionData = {
    onCreateBoard: fn(),
    onCancel: fn(),
};

export default {
  title: 'Components/Cards/NewBoardCard',
  component: NewBoardCard,
  tags: ['autodocs'],
  args: {
    colors,
    ...ActionData,
  },
};

export const Default = {};
