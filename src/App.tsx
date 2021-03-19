import React, { FC } from 'react';
import { CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from 'src/store';
import ThemeProvider from 'src/views/base/material-ui/ThemeProvider';
import SetLocale from 'src/views/base/yup/SetLocale';
import RootRoutes from 'src/views/routes/RootRoutes';

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SnackbarProvider>
          <>
            <CssBaseline />
            <SetLocale />
            <BrowserRouter>
              <Route component={RootRoutes} />
            </BrowserRouter>
          </>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
