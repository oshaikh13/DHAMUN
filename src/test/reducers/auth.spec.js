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

  it('should handle a login user request' () => {

  });

  it('should handle user login failure', () => {

  });

  it('should handle user login success', () => {

  });

  it('should handle logging a user out', () => {

  })
});