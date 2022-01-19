import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';

import configureRedux from './state';
import theme from './theme';

import Screens from './screens';

const { store, persistor } = configureRedux();

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Screens />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Root;
