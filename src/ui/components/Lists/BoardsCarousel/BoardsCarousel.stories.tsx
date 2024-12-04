import { within, userEvent } from '@storybook/testing-library';
import { expect, fn } from '@storybook/test';
import BoardsCarousel from './BoardsCarousel';
import { Board } from '../../../../core/models/Board';
import { StoryObj } from '@storybook/react/*';

const boards: Board[] = [
  {
    id: '1',
    name: 'My super duper board',
    userId: '1',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'My super duper board 1',
    userId: '1',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'My super duper board 2',
    userId: '1',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'My super duper board 3',
    userId: '1',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const colors = [
  'A3537A', '5366A3', '57A353', 'A35353',
  '7453A3', 'D29034', '06AECC', '838C91',
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

type Story = StoryObj<typeof BoardsCarousel>;

export const Default = {
  args: {
    boards,
    colors,
    ...ActionData,
  },
};

export const TestBoardClick: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find the first board card and simulate a click
    const boardCard = canvas.getByText('My super duper board');
    await userEvent.click(boardCard);

    // Check that the onBoardClick handler was called
    await expect(args.onBoardClick).toHaveBeenCalledTimes(1);
    await expect(args.onBoardClick).toHaveBeenCalledWith(expect.objectContaining({
      id: '1',
      name: 'My super duper board',
    }));
  },
};

export const TestCreateBoard: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Simulate the "Create Board" button click to start creating a new board
    const createBoardButton = canvas.getByText(/create new board/i);
    await userEvent.click(createBoardButton);

    // Enter a new title for the board and create it
    const newBoardTitleInput = canvas.getByPlaceholderText('Enter board title');
    await userEvent.type(newBoardTitleInput, 'New Board Title');

    // Submit the new board
    const createButton = canvas.getByRole('button', { name: /add board/i });
    await userEvent.click(createButton);

    // Check that the onCreateBoard handler was called with the new board
    await expect(args.onCreateBoard).toHaveBeenCalledTimes(1);
    await expect(args.onCreateBoard).toHaveBeenCalledWith(expect.objectContaining({
      name: 'New Board Title',
    }));
  },
};


export const TestCreateBoardEmptyTitle: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Simulate the "Create Board" button click to start creating a new board
    const createBoardButton = canvas.getByText(/create new board/i);
    await userEvent.click(createBoardButton);

    // Try to submit without typing anything (empty title)

    // Ensure the 'Add Board' button is disabled
    const createButton = canvas.getByRole('button', { name: /add board/i });
    expect(createButton).toBeDisabled();

    // Check that the onCreateBoard handler has NOT been called
    await expect(args.onCreateBoard).toHaveBeenCalledTimes(0);

    // Try to dismiss by clicking "Cancel"
    const cancelButton = canvas.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    // Ensure that the "Create Board" button is back visible (indicating user canceled)
    const createBoardButtonAfterCancel = canvas.getByText(/create new board/i);
    expect(createBoardButtonAfterCancel).toBeInTheDocument();
  },
};

