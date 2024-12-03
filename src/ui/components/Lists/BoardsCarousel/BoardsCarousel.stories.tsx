import { fn } from '@storybook/test';
import  BoardsCarousel  from './BoardsCarousel';
import { Board } from '../../../../core/models/Board';

const boards = [
    { 
      id: '1', 
      name: 'My super duper board', 
      userId: '1', 
      version: 1, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    },
    { 
      id: '2', 
      name: 'My super duper board', 
      userId: '1', 
      version: 1, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    },
    { 
      id: '3', 
      name: 'My super duper board', 
      userId: '1', 
      version: 1, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    },
    { 
      id: '4', 
      name: 'My super duper board', 
      userId: '1', 
      version: 1, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    },
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
