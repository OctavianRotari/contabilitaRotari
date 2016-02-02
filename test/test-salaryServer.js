// jscs:disable
//jshint ignore: start

process.env.NODE_ENV = "test"

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('salary', function () {
  it('shold list all the salary on Get /stipedi', function() {
    chai.request(server)
    .get('/stipendi')
    .end( function (err, res) {
      res.should.have.status(200);
    });
  });

  it('should list specfic bill on Get /stipendi/<id>', function (){

  });

  it('should add a signle salary on POST  /stipendi', function (){
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
    });
  });

  it('should update a signle bill on PUT /fatture/<id>', function (){

  });

  it('should delete a single bill on delete  /fatturei/<id>', function (){

  });
});
