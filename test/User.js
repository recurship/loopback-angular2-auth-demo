'use strict';

describe('/User', function() {
  var server = require('../server/server');
  var request = require('supertest')(server);
  var chai = require('chai');
  var chaiHttp = require('chai-http');
  var should = chai.should();
  chai.use(chaiHttp);

  var User;

  before(function() {
    User = server.models.User;
  });
  /* Example test cases - this is probably already tested by Loopback */
  it('logins Users successfully', function(done) {
    chai.request(server)
    .post('/api/Users/login')
    .send({email: 'test@user.com', password: '123456'})
    .end(function(err, res) {
      res.should.have.status(200);
      res.body.should.have.property('id');
      res.body.should.have.property('ttl');
      res.body.should.have.property('userId');
      done();
    });
  });

  it('throws logins Users errors', function(done) {
    chai.request(server)
    .post('/api/Users/login')
    .send({email: 'test@user.com', password: '12345'})
    .end(function(err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error');
      done();
    });
  });
});
