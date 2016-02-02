// jscs:disable
//jshint ignore: start

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var bill = require('../models/bill.js')

chai.use(chaiHttp);

describe('bills', function (){

  bill.collection.drop();

  beforeEach(function (done) {
    var newBill = new bill ({
          'name': 'PneusMarket',
          'typeOfBill': 'credito',
          'numberOfBill': '2013',
          'total': '300.00',
          'note': 'man',
          'methodOfPayment': 'Bonifico',
          'iva': '20.00',
          'paid': '0'
        });

    newBill.save(function (err, data) {
      done();
    });
  });

  afterEach(function(done){
    bill.collection.drop();
    done()
  });

  it('should list all the bills on Get  /fatture', function (done){
    chai.request(server)
    .get('/fatture')
    .end(function (err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].name.should.equal('PneusMarket');
      done();
    });
  });

  it('should list specfic bill on Get /fatture/<id>', function (){

  });

  it('should add a signle bill on POST  /fatture', function (done){
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
      done();
    });
  });

  it('should update a signle bill on PUT /fatture/<id>', function (){

  });

  it('should delete a single bill on delete  /fatturei/<id>', function (){

  });
});
