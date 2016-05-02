import request from "superagent";
import { hashHistory } from 'react-router'

export function authRequest () {
  return {
    type: "LOGIN_USER_REQUEST"
  }
}

export function authFailure (statusCode, statusText) {
  return {
    type: "LOGIN_USER_FAILURE",
    statusText,
    statusCode
  }
}

export function authSuccess (token) {
  return {
    type: "LOGIN_USER_SUCCESS",
    token
  }
}

export function logOut () {
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
          dispatch(authFailure(res.status, res.statusText));
        } else {
          dispatch(authSuccess(JSON.parse(res.text).token));
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
          dispatch(authFailure(res.status, res.statusText));
        } else {
          dispatch(authSuccess(JSON.parse(res.text).token));
        }
      });
  }
}
