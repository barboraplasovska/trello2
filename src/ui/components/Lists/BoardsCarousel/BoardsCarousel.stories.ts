import { fn } from '@storybook/test';
import  BoardsCarousel  from './BoardsCarousel';


const boards = [
    { id: '1', title: 'My super duper board', color: '#A3537A' },
    { id: '2', title: 'My super duper board', color: '#5366A3' },
    { id: '3', title: 'My super duper board', color: '#57A353' },
    { id: '4', title: 'My super duper board', color: '#A35353' },
];

const ActionData = {
    onBoardClick: fn(),
    onCreateBoardClick: fn(),
};

export default {
  title: 'Components/Lists/BoardsCarousel',
  component: BoardsCarousel,
  tags: ['autodocs'],
  args: {
    boards,
    ...ActionData,
  },
};

export const Default = {};
