import { fn } from '@storybook/test';
import  BoardsCarousel  from './BoardsCarousel';

const boards = [
    { id: '1', title: 'My super duper board', color: '#A3537A' },
    { id: '2', title: 'My super duper board', color: '#5366A3' },
    { id: '3', title: 'My super duper board', color: '#57A353' },
    { id: '4', title: 'My super duper board', color: '#A35353' },
];

const colors = [
    'A3537A', '5366A3', '57A353', 'A35353',
    '7453A3', 'D29034', '06AECC', '838C91'
];
  
const ActionData = {
    onBoardClick: fn(),
    onCreateBoard: fn(),
};

export default {
  title: 'Components/Lists/BoardsCarousel',
  component: BoardsCarousel,
  tags: ['autodocs'],
  args: {
    boards,
    colors,
    ...ActionData,
  },
};

export const Default = {};
