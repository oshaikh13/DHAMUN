import request from 'superagent';

function getFbaseToken (userToken, cb) {

  request
    .post(SERVER_URL + '/api/users/fbasetoken')
    .set({ 'x-access-token': userToken,
    'content-type': 'application/json' })
    .end((err, res) => {
      if (err || !res.ok) {
          // panic
      } else {
          debugger;
          cb(res.body.updatedToken);
      }
    });

}

export { getFbaseToken };