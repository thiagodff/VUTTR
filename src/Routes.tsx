import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />

      <Route path="/" component={() => <h1>404 not found</h1>} />
    </Switch>
  );
}
