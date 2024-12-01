import { fn } from '@storybook/test';
import { SubAppBar } from './SubAppBar';

const ActionData = {
  onDelete: fn(),
  onEdit: fn(),
}

export default {
  title: 'Components/AppBars/SubAppBar',
  component: SubAppBar,
  tags: ['autodocs'],
  args: {
    title: 'My super duper board card',
    ...ActionData,
  }
};

export const Default = {};
