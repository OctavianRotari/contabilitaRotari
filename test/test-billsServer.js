// jscs:disable
//jshint ignore: start

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('bills', function (){
  it('should list all the bills on Get  /fatture', function (){
    chai.request(server)
    .get('/fatture')
    .end(function (err, res){
      res.should.have.status(200);
      done();
    });
  });

  it('should list specfic bill on Get /fatture/<id>', function (){
    
  });

  it('should add a signle bill on POST  /fatture', function (){
    var bill = {
      'name': 'Bezzi',
      'typeOfBill': 'credito',
      'numberOfBill': '2013',
      'total': '300.00',
      'note': 'man',
      'methodOfPayment': 'Bonifico',
      'iva': '20.00',
      'paid': '0'
    }
    chai.request(server)
    .post('/fatture')
    .send(bill)
    .end(function (err, res){
      res.should.have.status(200);
    });
  });

  it('should update a signle bill on PUT /fatture/<id>', function (){

  });

  it('should delete a single bill on delete  /fatturei/<id>', function (){

  });
});
