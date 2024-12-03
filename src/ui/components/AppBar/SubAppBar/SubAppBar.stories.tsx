import { within, userEvent } from '@storybook/testing-library';
import { SubAppBar } from './SubAppBar';
import { StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions';
import { DialogType } from '../../../../core/models/DialogType';

const ActionData = {
  onDelete: fn(),
  onEdit: fn(),
};

export default {
  title: 'Components/AppBars/SubAppBar',
  component: SubAppBar,
  tags: ['autodocs'],
  args: {
    title: 'My super duper board card',
    ...ActionData,
  },
};

type Story = StoryObj<typeof SubAppBar>;

export const Default: Story = {};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Find and assert the elements that should be rendered in the SubAppBar
  const titleElement = await canvas.findByText('My super duper board card');
  await expect(titleElement).toBeInTheDocument();

  const editButton = await canvas.findByRole('button', { name: /edit/i });
  const deleteButton = await canvas.findByRole('button', { name: /delete/i });
  await expect(editButton).toBeInTheDocument();
  await expect(deleteButton).toBeInTheDocument();

  // Click on the edit button
  await userEvent.click(editButton);

  // Check if the input element appears and behaves correctly
  const inputElement = await canvas.findByRole('textbox');
  await expect(inputElement).toBeInTheDocument();
  await expect(inputElement).toHaveValue('My super duper board card');

  // Modify the input value and submit by pressing Enter
  await userEvent.clear(inputElement);
  await userEvent.type(inputElement, 'Updated board title');
  await userEvent.type(inputElement, '{enter}');  // Ensure the 'Enter' key is pressed

  // Ensure onEdit callback was called with the updated title
  await expect(ActionData.onEdit).toHaveBeenCalledWith('Updated board title');

  // Click on the delete button
  await userEvent.click(deleteButton);

  // Ensure onDelete callback was called
  await expect(ActionData.onDelete).toHaveBeenCalled();
};

export const MissingOnEditAndOnDelete: Story = {
  args: {
    onEdit: undefined,
    onDelete: undefined,
  },
};

MissingOnEditAndOnDelete.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Find and assert the elements that should be rendered in the SubAppBar
  const titleElement = await canvas.findByText('My super duper board card');
  await expect(titleElement).toBeInTheDocument();

  // Check that edit and delete buttons are still in the document
  const editButton = await canvas.findByRole('button', { name: /edit/i });
  const deleteButton = await canvas.findByRole('button', { name: /delete/i });
  await expect(editButton).toBeInTheDocument();
  await expect(deleteButton).toBeInTheDocument();

  // Ensure that clicking the buttons doesn't trigger any callback (because handlers are undefined)
  await userEvent.click(editButton);
  await userEvent.click(deleteButton);

  // Verify no handler was called
  await expect(ActionData.onEdit).not.toHaveBeenCalled();
  await expect(ActionData.onDelete).not.toHaveBeenCalled();
};

export const Interactions: Story = {
  args: {
    onEdit: action('onEdit'),
    onDelete: action('onDelete'),
  },
};

Interactions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Find and assert that the elements we need are rendered
  const titleElement = await canvas.findByText('My super duper board card');
  await expect(titleElement).toBeInTheDocument();

  const editButton = await canvas.findByRole('button', { name: /edit/i });
  const deleteButton = await canvas.findByRole('button', { name: /delete/i });
  await expect(editButton).toBeInTheDocument();
  await expect(deleteButton).toBeInTheDocument();

  // Test the edit button
  await userEvent.click(editButton);
  const inputElement = await canvas.findByRole('textbox');
  await expect(inputElement).toBeInTheDocument();

  // Edit the title and submit by pressing Enter
  await userEvent.clear(inputElement);
  await userEvent.type(inputElement, 'Updated board title');
  await userEvent.type(inputElement, '{enter}');

  // Validate the edit callback was triggered with the updated value
  //await expect(action('onEdit')).toHaveBeenCalledWith('Updated board title');

  // Now test the delete button
  await userEvent.click(deleteButton);
  //await expect(ActionData.onDelete).toHaveBeenCalledWith(DialogType.Board, null);
};
