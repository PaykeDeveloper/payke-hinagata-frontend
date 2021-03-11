import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from 'src/state/store';
import ThemeProvider from 'src/views/components/base/material-ui/ThemeProvider';
import SetLocale from 'src/views/components/base/yup/SetLocale';
import RootRoutes from 'src/views/routes/RootRoutes';

function App() {
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
}

export default App;
