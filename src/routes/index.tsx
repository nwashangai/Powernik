import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// components
import Home from 'pages/Home';
import Report from 'pages/Report';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/reports" component={Report} />
    <Route exact path="/reports/:employee" component={Report} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
