import { Preview } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    decorators: [
      (Story) => (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      ),
    ],
  },
};

export default preview;
