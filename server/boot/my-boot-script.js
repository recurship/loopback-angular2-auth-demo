'use strict';

// Any objects you want to have on initialization please add here.
module.exports = function(app) {
  var AppUser = app.models.AppUser;
  AppUser.destroyAll(function() {
    AppUser.create(
      {
        username: 'test',
        type: 'free',
        email: 'test@user.com',
        password: '123456',
      }, function(err, userInstance) {
      if (err) console.log('===>', err);
      console.log(userInstance);
    });
  });
};

