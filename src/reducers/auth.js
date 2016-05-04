import jwtDecode from 'jwt-decode';

import { hashHistory } from 'react-router'

const initialState = {
  token: null,
  email: null,
  isAuthenticated: false,
  isAuthenticating: false,
  loginStatusText: null,
  signUpStatusText: null,
  hasSignedUp: false
};

export function auth(state = initialState, action) {
  let usrObject;
  switch (action.type) {
    case 'LOGIN_USER_REQUEST': 
      // TODO: Use immutable.js
      return Object.assign({}, state, {
        'isAuthenticating': true
      });

    case 'LOGIN_USER_FAILURE': 
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'token': null,
        'userName': null,
        'loginStatusText': `Authentication Error: ${action.status} ${action.statusText}`
      });

    case 'LOGIN_USER_SUCCESS': 
      const usrObject = jwtDecode(action.token);
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.token,
        'firstName': usrObject.firstName,
        'lastName': usrObject.lastName,
        'committee': usrObject.committee,
        'userLevel': usrObject.userLevel,
        'school': usrObject.school,
        'email': usrObject.email,
        'loginStatusText': 'You have been successfully logged in.'
      });

    case 'SIGNUP_USER_SUCCESS':
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'token': null,
        'hasSignedUp': true,
        'signUpStatusText': 'You have validated your account. You can sign up now!'
      }); 

    case 'SIGNUP_USER_FAILURE': 
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'token': null,
        'hasSignedUp': false,
        'signUpStatusText': `Authentication Error: ${action.status} ${action.statusText}`
      });

    case 'LOGOUT_USER' : 
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'userName': null,
        'loginStatusText': null,
        'signUpStatusText': null
      });

    default:
      return state;

  }
}

