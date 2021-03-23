import React from 'react';

import 'src/base/i18n';

import { Story } from '@storybook/react';
import { Provider } from 'react-redux';
import store from 'src/store';
import ThemeProvider from 'src/view/base/material-ui/ThemeProvider';

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
