import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MainAppBar } from './MainAppBar';
import { action } from '@storybook/addon-actions';

import { within, userEvent } from '@storybook/testing-library';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainAppBar> = {
  title: 'Components/AppBars/MainAppBar',
  component: MainAppBar,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
};

export default meta;

type Story = StoryObj<typeof MainAppBar>;

export const Default: Story = {
  args: {
    onLogout: action('onLogout'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const boardsLink = canvas.getByText('My boards');
    await userEvent.click(boardsLink);
    console.log('Link clicked:', boardsLink);

    const logoutButton = canvas.getByRole('button', { name: /logout/i });
    await userEvent.click(logoutButton);
  },
};

export const MissingOnLogout: Story = {
  args: {
    onLogout: undefined,
  },
};