import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from './store/configureStore';
import { hashHistory } from 'react-router';
// Change this to hashHistory for dev if needed. Not really needed lol.
import routes from './routes';

const store = configureStore();

var config = {
  apiKey: "AIzaSyCpdsZyQ3BdUcYmgX7yf1DYScay4lRmQLE",
  authDomain: "referendum-b0015.firebaseapp.com",
  databaseURL: "https://referendum-b0015.firebaseio.com",
  projectId: "referendum-b0015",
  storageBucket: "referendum-b0015.appspot.com",
  messagingSenderId: "239754208581"
};

firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
