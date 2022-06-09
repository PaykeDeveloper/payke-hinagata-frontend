import React, { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from 'src/store';
import ThemeProvider from 'src/view/base/material-ui/ThemeProvider';
import SetLocale from 'src/view/base/yup/SetLocale';
import RootRoutes from 'src/view/routes/RootRoutes';

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
