'use strict';

module.exports = function(app) {
  var User = app.models.User;
  var TWO_WEEKS = 60 * 60 * 24 * 7 * 2;

  User.create(
    {
      email: 'test@user.com',
      password: '123456',
    }, function(err, userInstance) {
    console.log(userInstance);
  });

  User.login({
    email: 'test@user.com',           // must provide email or "username"
    password: '123456',               // required by default
    ttl: TWO_WEEKS,                    // keep the AccessToken alive for at least two weeks
  }, function(err, accessToken) {
    console.log(accessToken.id);      // => GOkZRwg... the access token
    console.log(accessToken.ttl);     // => 1209600 time to live
    console.log(accessToken.created); // => 2013-12-20T21:10:20.377Z
    console.log(accessToken.userId);  // => 1
  });
};

