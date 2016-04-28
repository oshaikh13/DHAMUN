import request from "superagent";

const SERVER_URL = 'http://localhost:3000'

export function logIn (userData) {
  return function (dispatch) {
    dispatch(authRequest());

    // Implement form checking here...

    request
      .post(SERVER_URL + '/api/users/login')
      .send(userData)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(authFailure(
            {
              status: "Some Error Code",
              statusText: "Something Went Wrong"
            }
          ));
        } else {
          dispatch(authSuccess(
            {
              token: res.token
            }
          ));
        }
      });

  }
}

export function authRequest () {
  return {
    type: "LOGIN_USER_REQUEST"
  }
}

export function authFailure (failureInfo) {
  return {
    type: "LOGIN_USER_FAILURE",
    failureInfo
  }
}

export function authSuccess (userInfo) {
  return {
    type: "LOGIN_USER_SUCCESS",
    userInfo
  }
}

export function signIn (userData) {
  return function (dispatch) {
    dispatch(authRequest());

    // Implement form checking here...

    request
      .post(SERVER_URL + '/api/users/signin')
      .send(userData)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(authFailure(
            {
              status: "Some Error Code",
              statusText: "Something Went Wrong"
            }
          ));
        } else {
          dispatch(authSuccess(
            {
              token: res.token
            }
          ));
        }
      });

  }
}