import chai from 'chai';
import { auth } from 'reducers/auth';

var assert = chai.assert;

const initialState = {
  token: null,
  email: null,
  isAuthenticated: false,
  isAuthenticating: false,
  loginStatusText: null,
  signUpStatusText: null,
  hasSignedUp: false,
  committee: null,
  firstName: null,
  lastName: null,
  school: null,
  userLevel: null,
  country: null,
  partner: null
};

describe('Authentication Reducers :' , function(){

  it("Should return the same state", function(){
    const initState = JSON.stringify(initialState);
    const result = JSON.stringify(auth(initialState, {type: 'NOT_A_FUNCTION'}));

    assert.equal(initState, result);
  })

  it("Should handle user login request", function(){

    const stateAfter = JSON.stringify({'isAuthenticating': true});

    const result = JSON.stringify(auth({}, {type: 'LOGIN_USER_REQUEST'}));

    assert.equal(stateAfter, result);
  })

  it("Should handle user login failure", function(){

    const stateAfter = JSON.stringify({
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'loginStatusText': 'Authentication Error: 408 Timeout' 
    });

    const result = JSON.stringify(auth({}, {type: 'LOGIN_USER_FAILURE', status : '408', statusText : 'Timeout'}));

    assert.equal(stateAfter, result);

  })

  it("Should handle user login success", function(){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJCcnVjZSIsImxhc3ROYW1lIjoiV2F5bmUiLCJjb21taXR0ZWUiOiJOYW4iLCJ1c2VyTGV2ZWwiOiJuYW4iLCJzY2hvb2wiOiJuYW4iLCJlbWFpbCI6Im5hbiIsImNvdW50cnkiOiJuYW4iLCJwYXJ0bmVyIjoiQmF0bWFuISJ9.mLiMAMX_4EpJVtmM9NAQgjcI_NyySS5VPJ8Px1Iss4Q';

    const stateAfter = JSON.stringify({
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': token,
      "firstName": "Bruce",
      "lastName": "Wayne",
      "committee": "GA",
      "userLevel": "69",
      "school": "Some school",
      "email": "wallah_not_batman@gmail.com",
      "country": "USA",
      "partner": "none",
      'loginStatusText': 'You have been successfully logged in.'
    });

    const result = JSON.stringify(auth({}, {type: 'LOGIN_USER_SUCCESS', token : token}));

  })

  it("Should handle sign up success", function(){
    const stateAfter =  JSON.stringify({
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'hasSignedUp': true,
      'signUpStatusText': 'You have validated your account. You can sign up now!'
    });

    const result = JSON.stringify(auth({}, {type : 'SIGNUP_USER_SUCCESS'}));

    assert.equal(stateAfter, result);
  })

  it("Should handle sign up failure", function(){
    const stateAfter = JSON.stringify({
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'hasSignedUp': false,
      'signUpStatusText': 'Authentication Error: 400 Bad Request'
    });

    const result = JSON.stringify(auth({}, {type : 'SIGNUP_USER_FAILURE', status : '400', statusText : 'Bad Request'}));

    assert.equal(result, stateAfter);
  })

  it("Should handle user logout", function(){

    const stateAfter = JSON.stringify(initialState);

    const result = JSON.stringify(auth({}, {type : 'LOGOUT_USER'}));

    assert.equal(stateAfter, result);
  })

});