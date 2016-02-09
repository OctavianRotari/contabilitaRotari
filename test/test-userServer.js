// jscs:disable
//jshint ignore: start

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var user = require('../server/models/user.js');

chai.use(chaiHttp);

describe('user', function () {

  user.collection.drop();

  afterEach(function (done){
    setTimeout(function(){
      user.collection.drop();
      done();
    }, 50);
  });

  it('should return a successful message when the user register corectly', function (done) {
    var user = {
      username: "Octavian",
      password: "1234"
    }
    chai.request(server)
    .post('/user/register')
    .send(user)
    .end( function (err, res){
      res.should.have.status(200);
      res.body.should.have.property('status');
      res.body.should.have.property('account');
      res.body.account.should.have.property('salt');
      res.body.account.should.have.property('hash');
      res.body.account.should.have.property('hash');
      res.body.account.should.have.property('username');
      res.body.account.username.should.equal('Octavian');
      done();
    });
  });

  describe('when it already exists', function () {

    var userOctavian = {
      username: "Octavian",
      password: "1234"
    }

    beforeEach(function(done){
      setTimeout(function () {
        var user = {
          username: "Octavian",
          password: "1234"
        }
        chai.request(server)
        .post('/user/register')
        .send(user)
        .end( function (err, res){
          done();
        });
      }, 50)
    });

    afterEach(function (done){
        setTimeout(function(){
          user.collection.drop();
          done();
        }, 50);
      });
    //beforeEach(function(done){
    //setTimeout(function () {
    //var newUser = new user ({
    //'username': "Octavian",
    //'password': "1234",
    //'salt': '1234'
    //});

    //newUser.save(function (err, data) {
    //done();
    //});
    //}, 50)
    //});

    it('it should return a successful message when a user logs in', function (done) {
      chai.request(server)
      .post('/user/login')
      .send(userOctavian)
      .end( function (err, res){
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.status.should.equal('Log in successful');
        done();
      });
    });

    it('it should return a un-successful message when a user logs in with a wrong password', function (done) {
      userOctavian.password = 'password';
      chai.request(server)
      .post('/user/login')
      .send(userOctavian)
      .end( function (err, res){
        res.should.have.status(401);
        res.body.should.have.property('err');
        res.body.err.message.should.equal('Incorrect password');
        done();
      });
    });

    it('should return a successful message when a users logs out', function (done) {
      chai.request(server)
      .get('/user/logout')
      .end( function (err, res){
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.status.should.equal('Bye');
        done();
      });
    })
  });
});
