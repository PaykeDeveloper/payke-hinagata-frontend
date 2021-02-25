import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from 'src/state/store';
import ThemeProvider from 'src/views/base/material-ui/ThemeProvider';
import SetLocale from 'src/views/base/yup/SetLocale';
import RootRoutes from 'src/views/routes/RootRoutes';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <>
          <CssBaseline />
          <SetLocale />
          <BrowserRouter>
            <Route component={RootRoutes} />
          </BrowserRouter>
        </>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
