import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER_REQUEST' : 
      // TODO: Use immutable.js
      return Object.assign({}, state, {
        'isAuthenticating': true,
        'statusText': null
      };

    case 'LOGIN_USER_FAILURE' : 
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'token': null,
        'userName': null,
        'statusText': `Authentication Error: ${action.status} ${action.statusText}`
      });

    case 'LOGIN_USER_SUCCESS' : 
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.token,
        'userName': jwtDecode(action.token).userName,
        'statusText': 'You have been successfully logged in.'
      });

    case 'LOGOUT_USER' : 
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'userName': null,
        'statusText': 'You have been successfully logged out.'
      });

  }
}

