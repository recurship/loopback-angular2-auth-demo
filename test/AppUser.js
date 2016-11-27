'use strict';

describe('/AppUser', function() {
  var server = require('../server/server');
  var request = require('supertest')(server);
  var chai = require('chai');
  var chaiHttp = require('chai-http');
  var should = chai.should();
  chai.use(chaiHttp);

  var AppUser;

  before(function(done) {
    AppUser = server.models.AppUser;
    AppUser.destroyAll(function() {
      AppUser.create(
        {
          username: 'testuser',
          type: 'free',
          email: 'testuser@user.com',
          password: '123456',
        }, function(err, userInstance) {
        if (err) console.log('===>', err);
        done();
      });
    });
  });

  it('logins AppUsers successfully using email', function(done) {
    chai.request(server)
    .post('/api/AppUsers/login')
    .send({email: 'testuser@user.com', password: '123456'})
    .end(function(err, res) {
      res.should.have.status(200);
      res.body.should.have.property('id');
      res.body.should.have.property('ttl');
      res.body.should.have.property('userId');
      done();
    });
  });

  it('logins AppUsers successfully using username', function(done) {
    chai.request(server)
    .post('/api/AppUsers/login')
    .send({username: 'testuser', password: '123456'})
    .end(function(err, res) {
      res.should.have.status(200);
      res.body.should.have.property('id');
      res.body.should.have.property('ttl');
      res.body.should.have.property('userId');
      done();
    });
  });

  it('throws logins AppUsers errors', function(done) {
    chai.request(server)
    .post('/api/AppUsers/login')
    .send({email: 'testuser@user.com', password: '12345'})
    .end(function(err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error');
      done();
    });
  });

});
