import React from 'react';

import 'src/base/i18n';

import { Story } from '@storybook/react';
import { Provider } from 'react-redux';
import store from 'src/state/store';
import ThemeProvider from 'src/views/components/base/material-ui/ThemeProvider';

export const ThemeDecorator = (StoryComponent: Story) => (
  <ThemeProvider>
    <StoryComponent />
  </ThemeProvider>
);
export const ReduxDecorator = (StoryComponent: Story) => (
  <Provider store={store}>
    <StoryComponent />
  </Provider>
);
