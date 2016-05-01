import expect from 'expect';
import { auth } from 'reducers/auth';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

describe('Auth reducer:', () => {
  it('should return the initial state', () => {
    expect(
      auth(initialState, {})
    ).toEqual(initialState);
  });

  it('should handle a login user request', () => {
    const stateAfter = {
      token: null,
      userName: null,
      isAuthenticated: false,
      isAuthenticating: true,
      statusText: null
    }

    expect(
      auth(initialState, {
        type: "LOGIN_USER_REQUEST",
      })
      ).toEqual(stateAfter);
  });

  it('should handle user login failure', () => {
    const stateAfter = {
      token: null,
      userName: null,
      isAuthenticated: false,
      isAuthenticating: false,
      statusText: 'Authentication Error: 408 Request Timeout'
    }

    expect(
      auth(initialState, {
        type: 'LOGIN_USER_FAILURE',
        status : '408',
        statusText : 'Request Timeout'
      })
    ).toEqual(stateAfter);
  });

  //Used Random token I found Online 
  it('should handle user login success', () => {
    const stateAfter = {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4gRG9lIn0.-mwT8PGtVsO8mAaw6bbhMvHbte-NNd95a3CokY2QGR0',
        'userName': "John Doe",
        'statusText': 'You have been successfully logged in.'
    }

    expect(
        auth(initialState, {
          type: 'LOGIN_USER_SUCCESS',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4gRG9lIn0.-mwT8PGtVsO8mAaw6bbhMvHbte-NNd95a3CokY2QGR0'
        })
      ).toEqual(stateAfter);

  });

  it('should handle logging a user out', () => {
    const stateAfter = {
        'isAuthenticated': false,
        'isAuthenticating': false,
        'token': null,
        'userName': null,
        'statusText': 'You have been successfully logged out.'
    }

    expect(
      auth(initialState, {
        type : 'LOGOUT_USER'
      })
      ).toEqual(stateAfter);
  })
});