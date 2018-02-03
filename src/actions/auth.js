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

  socket.on("reconnect", function() {
    console.log("establishing reconnection");    
    socket.emit("subscribe", {token: token});          
  }.bind(this));

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

export function passwordResetSuccess () {
  return {
    type: "LOGIN_PASSWORD_RESET_SUCCESS"
  }
}

export function passwordResetFailure () {
  return {
    type: "LOGIN_PASSWORD_RESET_FAILURE"
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

          if (!res) {
            res = {
              status: 500,
              body: {
                error: "Server is down. Alert a staff member."
              }
            }
            // shit
          }

          dispatch(loginFailure(res.status, res.body.error, true));
        } else {
          dispatch(loginSuccess(res.body.token));
        }
      });

  }
}

export function resetPassword (userEmail) {
  return function (dispatch) {
    request
      .post(SERVER_URL + '/api/mails/send')
      .send({
        recipient: "SINGLE",
        type: "FORGOT_PASS",
        email: userEmail
      })
      .end((err, res) => {
        if (err || !res.ok) {

          if (!res) {
            res = {
              status: 500,
              body: {
                error: "Server is down. Alert a staff member."
              }
            }
            // shit
          }

          // TODO: Dispatch failure
          // dispatch(loginFailure(res.status, res.body.error, true));
          dispatch(passwordResetFailure());
        } else {
          dispatch(passwordResetSuccess());
        }
      })
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

          if (!res) {
            res = {
              status: 500,
              body: {
                error: "Server is down. Alert a staff member."
              }
            }
            // shit
          }

          dispatch(signUpFailure(res.status, res.body.error));
        } else {
          dispatch(signUpSuccess(JSON.parse(res.text).token));
        }
      });
  }
}
