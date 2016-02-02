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
      done();
    });
  });

  it('should list specfic bill on Get /stipendi/<id>', function (){

  });

  it('should add a signle salary on POST  /stipendi', function (done){
    var salary = {
      'name': 'Eugeniu',
      'month': 'Gennaio',
      'total': '200',
      'paid': '50'
    }
    chai.request(server)
    .post('/stipendi')
    .send(salary)
    .end(function (err, res){
      res.should.have.status(200);
      done();
    });
  });

  it('should update a signle bill on PUT /fatture/<id>', function (){

  });

  it('should delete a single bill on delete  /fatturei/<id>', function (){

  });
});
