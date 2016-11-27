'use strict';

var app = require('../../server/server');
var mailGun = require('../mailgun');
var handlers = {};
var User;

handlers.sendResetMail = (userInstance) => {
  console.log(userInstance);
  var data = {
    from: 'Admin <admin@domain.com>',
    to: userInstance.email,
    subject: 'Reset Password',
    text: `
      Please reset your password at
      http://${app.get('host')}:${app.get('port')}/reset?token=${userInstance.accessToken.id}`
  };

  mailGun.messages().send(data,(err, body) => {
    if(err) console.log('Unable to send create email', err);
    console.log('Reset done', body, data);
  });
}

app.post('/api/ApiUsers/reset-password', function(req, res, next) {
  if (!req.query.accessToken) return res.sendStatus(401);
  app.models.AccessToken.findById(req.query.accessToken, (err, token) => {
    User.findById(token.userId, function(err, user) {
      if (err) return res.sendStatus(404);
      user.updateAttribute('password', req.body.password, function(err, user) {
        if (err) return res.sendStatus(404);
        res.send(200);
      });
    });
  });
});


module.exports = function(AppUser) {
  User = AppUser;
  AppUser.validatesInclusionOf('type', {in: ['free', 'paid']});
  AppUser.validatesUniquenessOf('email', {message: 'Email is already present.'});
  AppUser.validatesUniquenessOf('username', {message: 'Username is already taken.'});
  AppUser.on('resetPasswordRequest', handlers.sendResetMail);
};

