import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { HomeApp } from 'containers/HomeApp';
import { DelegateDashboardApp } from 'containers/DelegateDashboardApp';

import { Home } from 'containers/Home';
import { List } from 'containers/List';
import { Login } from 'containers/Login';
import { Logout } from 'containers/Logout';

import { SignUp } from 'containers/SignUp';
import { Vote } from 'containers/Vote';
import { VoteAction } from 'containers/VoteAction';

import { Resolutions } from 'containers/Resolutions';

import { DelegateDashboardHome } from 'containers/DelegateDashboardHome';
import { requireAuthentication } from 'components/AuthenticatedComponent';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/home"/>

    <Route path="/home" component={HomeApp}>
      <IndexRoute component={Home}/>
      <Route path="/home/list" component={List}/>
      <Route path="/home/login" component={Login}/>
      <Route path="/home/signup/:hash/" component={SignUp}/>


    </Route>

    <Route path="/dashboard">
      <IndexRedirect to="/home"/>
      <Route path="/dashboard/delegate" component={requireAuthentication(DelegateDashboardApp, "Delegate")}>
        <IndexRoute component={DelegateDashboardHome}/>
        <Route path="/dashboard/delegate/vote" component={Vote}/>
        <Route path="/dashboard/delegate/vote/:name" component={VoteAction}/>



        <Route path="/dashboard/delegate/resolutions" component={Resolutions}/>
      </Route>
      
      <Route path="/dashboard/logout" component={Logout}/>

    </Route>


    <Route status={404} path="*" component={HomeApp} />
  </Route>

);
