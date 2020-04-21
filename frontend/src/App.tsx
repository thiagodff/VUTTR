import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import Routes from './Routes';
import history from './services/history';
import store from './store';

import GlobalStyle from './styles/global';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
        <ToastContainer autoClose={3000} />
        <GlobalStyle />
      </Router>
    </Provider>
  );
}
