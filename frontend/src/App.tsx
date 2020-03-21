import React from 'react';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './Routes';
import history from './services/history';

export default function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}
