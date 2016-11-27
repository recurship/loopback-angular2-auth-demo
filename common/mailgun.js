
var app = require('../server/server');

if(!app.get('mailgun').apiKey || !app.get('mailgun').domain) {
    throw new Error('Please configure Mailgun variables in server/config.local.json');
}

var mailgun = require('mailgun-js')({
    apiKey: app.get('mailgun').apiKey, 
    domain: app.get('mailgun').domain
});

module.exports = mailgun;