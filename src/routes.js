import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { HomeApp } from 'containers/HomeApp';
import { Home } from 'containers/Home';
import { List } from 'containers/List';
import { Login } from 'containers/Login';
import { SignUp } from 'containers/SignUp';


import { requireAuthentication } from 'components/AuthenticatedComponent';

export default (
  <Route path="/" component={HomeApp}>
    <IndexRoute component={Home} />
    <Route path="list" component={List} />
    <Route path="login" component={Login} />
    <Route path="signup" component={SignUp} />


    <Route status={404} path="*" component={Home} />
  </Route>
);
