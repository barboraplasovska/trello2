import React from 'react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import { CustomIconButton } from './CustomIconButton';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { fn } from '@storybook/test';
import { StoryObj } from '@storybook/react/*';

const ActionData = {
  onClick: fn(),
};

export default {
  title: 'Components/Buttons/CustomIconButton',
  component: CustomIconButton,
  tags: ['autodocs'],
  args: {
    icon: <SyncAltIcon />,
    ariaLabel: 'Move list',
    tooltip: 'Move list',
    paddingNb: 5,
    ...ActionData,
  },
};

type Story = StoryObj<typeof CustomIconButton>;

export const Default: Story = {
  args: {
    icon: <SyncAltIcon />,
    ariaLabel: 'Move list',
    tooltip: 'Move list',
    onClick: ActionData.onClick,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the button by its aria-label
    const button = canvas.getByRole('button', { name: 'Move list' });

    // Verify the button is rendered
    await expect(button).toBeInTheDocument();

    // Hover over the button to check tooltip behavior
    await userEvent.hover(button);

    // Simulate a click on the button
    await userEvent.click(button);

    // Verify that the onClick callback was triggered
    await expect(ActionData.onClick).toHaveBeenCalledTimes(1);
  }
};