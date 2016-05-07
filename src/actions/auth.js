import request from 'superagent';
import { hashHistory } from 'react-router'
import { socket } from '../../src/utils/socket.js';

export function authRequest () {
  return {
    type: "LOGIN_USER_REQUEST"
  }
}

export function loginFailure (status, statusText) {
  return {
    type: "LOGIN_USER_FAILURE",
    statusText,
    status
  }
}

export function loginSuccess (token) {
  socket.emit("subscribe", {token: token});
  return {
    type: "LOGIN_USER_SUCCESS",
    token
  }
}

export function signUpFailure (status, statusText) {
  return {
    type: "SIGNUP_USER_FAILURE",
    statusText,
    status
  }
}

export function signUpSuccess () {
  return {
    type: "SIGNUP_USER_SUCCESS"
  }
}

export function logOut (token) {
  socket.emit('logout', {token: token});
  hashHistory.push('/home');
  return {
    type: "LOGOUT_USER"
  }
}

export function signIn (userData) {
  return function (dispatch) {
    dispatch(authRequest());

    request
      .post(SERVER_URL + '/api/users/signin')
      .send(userData)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(loginFailure(res.status, res.body.error, true));
        } else {
          dispatch(loginSuccess(res.body.token));
        }
      });

  }
}

export function signUp (userData) {
  return function (dispatch) {
    dispatch(authRequest());

    request
      .post(SERVER_URL + '/api/users/signup')
      .send(userData)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(signUpFailure(res.status, res.body.error));
        } else {
          dispatch(signUpSuccess(JSON.parse(res.text).token));
        }
      });
  }
}
