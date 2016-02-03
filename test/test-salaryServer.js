// jscs:disable
//jshint ignore: start

process.env.NODE_ENV = "test"

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var salary = require('../models/salary.js')

chai.use(chaiHttp);

describe('salary', function () {

  salary.collection.drop();

  beforeEach(function (done){
    var newSalary = new salary ({
      'name': 'Danu',
      'month': 'Gennaio',
      'total': '200',
      'paid': '50'
    });

    newSalary.save(function (err, data){
      done();
    });
  });

  afterEach(function (done){
    salary.collection.drop();
    done();
  });

  it('shold list all the salary on Get /stipedi', function(done) {
    chai.request(server)
    .get('/stipendi')
    .end( function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('month');
      res.body[0].should.have.property('paid');
      res.body[0].should.have.property('total');
      res.body[0].name.should.equal('Danu');
      res.body[0].month.should.equal('Gennaio');
      res.body[0].total.should.equal(200.00);
      res.body[0].paid.should.equal(50);
      done();
    });
  });

  it('should list specfic bill on Get /stipendi/<id>', function (done){
    var newSalary = new salary ({
      'name': 'eugeniu',
      'month': 'Gennaio',
      'total': '200',
      'paid': '50'
    });

    newSalary.save(function (err, data){
      chai.request(server)
      .get('/stipendi/' + data.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('month');
        res.body.should.have.property('paid');
        res.body.should.have.property('total');
        res.body.name.should.equal('eugeniu');
        res.body.month.should.equal('Gennaio');
        res.body.total.should.equal(200.00);
        res.body.paid.should.equal(50);
        done();
      });
    });
  });

  it('should add a signle salary on POST  /stipendi', function (done){
    var salary = {
      'name': 'Gabriel',
      'month': 'Gennaio',
      'total': '200',
      'paid': '50'
    }
    chai.request(server)
    .post('/stipendi')
    .send(salary)
    .end(function (err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('_id');
      res.body.should.have.property('name');
      res.body.should.have.property('month');
      res.body.should.have.property('paid');
      res.body.should.have.property('total');
      res.body.name.should.equal('Gabriel');
      res.body.month.should.equal('Gennaio');
      res.body.total.should.equal(200.00);
      res.body.paid.should.equal(50);
      done();
    });
  });

  it('should update a signle salary on PUT /stipendi/<id>', function (done){
    chai.request(server)
    .get('/stipendi')
    .end(function(err, res){
      chai.request(server)
      .put('/stipendi/' + res.body[0]._id)
      .send({'name': 'Gabriel'})
      .end(function(err, res){
        chai.request(server)
        .get('/stipendi')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('month');
          res.body[0].should.have.property('paid');
          res.body[0].should.have.property('total');
          res.body[0].name.should.equal('Gabriel');
          res.body[0].month.should.equal('Gennaio');
          res.body[0].total.should.equal(200.00);
          res.body[0].paid.should.equal(50);
          done();
        });
      });
    });
  });

  it('should delete a single bill on delete  /fatturei/<id>', function (){

  });
});
