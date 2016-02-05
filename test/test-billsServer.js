// jscs:disable
//jshint ignore: start

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var bill = require('../server/models/bill.js')

chai.use(chaiHttp);

describe('bills', function (){

  bill.collection.drop();

  beforeEach(function (done) {
    setTimeout(function(){
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

      newBill.save(function (err) {
        done();
      });
    });
  }, 50)

  afterEach(function(done){
    setTimeout(function(){
      bill.collection.drop();
      done();
    }, 50);
  });

  describe('CRUD', function (){
    it('should list all the bills on Get  /fatture', function (done){
      chai.request(server)
      .get('/fatture')
      .end(function (err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('typeOfBill');
        res.body[0].should.have.property('note');
        res.body[0].should.have.property('methodOfPayment');
        res.body[0].should.have.property('iva');
        res.body[0].should.have.property('paid');
        res.body[0].should.have.property('total');
        res.body[0].should.have.property('numberOfBill');
        res.body[0].name.should.equal('PneusMarket');
        res.body[0].typeOfBill.should.equal('credito');
        res.body[0].numberOfBill.should.equal(2013);
        res.body[0].total.should.equal(300.00);
        res.body[0].note.should.equal('man');
        res.body[0].methodOfPayment.should.equal('Bonifico');
        res.body[0].iva.should.equal(20.00);
        res.body[0].paid.should.equal(0);
        done();
      });
    });

    it('should list specfic bill on Get /fatture/<id>', function (done){
      var newBill = new bill ({
        'name': 'Feramenta',
        'typeOfBill': 'credito',
        'numberOfBill': '2013',
        'total': '300.00',
        'note': 'man',
        'methodOfPayment': 'Bonifico',
        'iva': '20.00',
        'paid': '0'
      });
      newBill.save(function (err, data) {
        chai.request(server)
        .get('/fatture/' + data.id)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('typeOfBill');
          res.body.should.have.property('note');
          res.body.should.have.property('methodOfPayment');
          res.body.should.have.property('iva');
          res.body.should.have.property('paid');
          res.body.should.have.property('total');
          res.body.should.have.property('numberOfBill');
          res.body.name.should.equal('Feramenta');
          res.body.typeOfBill.should.equal('credito');
          res.body.numberOfBill.should.equal(2013);
          res.body.total.should.equal(300.00);
          res.body.note.should.equal('man');
          res.body.methodOfPayment.should.equal('Bonifico');
          res.body.iva.should.equal(20.00);
          res.body.paid.should.equal(0);
          done();
        });
      });
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
        res.should.be.json;
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('typeOfBill');
        res.body.should.have.property('note');
        res.body.should.have.property('methodOfPayment');
        res.body.should.have.property('iva');
        res.body.should.have.property('paid');
        res.body.should.have.property('total');
        res.body.should.have.property('numberOfBill');
        res.body.name.should.equal('Bezzi');
        res.body.typeOfBill.should.equal('credito');
        res.body.numberOfBill.should.equal(2013);
        res.body.total.should.equal(300.00);
        res.body.note.should.equal('man');
        res.body.methodOfPayment.should.equal('Bonifico');
        res.body.iva.should.equal(20.00);
        done();
      });
    });

    it('should update a signle bill on PUT /fatture/<id>', function (done){
      chai.request(server)
      .get('/fatture')
      .end(function(err, res){
        chai.request(server)
        .put('/fatture/' + res.body[0]._id)
        .send({'paid': '100'})
        .end(function(err, res){
          chai.request(server)
          .get('/fatture')
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('typeOfBill');
            res.body[0].should.have.property('note');
            res.body[0].should.have.property('methodOfPayment');
            res.body[0].should.have.property('iva');
            res.body[0].should.have.property('paid');
            res.body[0].should.have.property('total');
            res.body[0].should.have.property('numberOfBill');
            res.body[0].name.should.equal('PneusMarket');
            res.body[0].typeOfBill.should.equal('credito');
            res.body[0].numberOfBill.should.equal(2013);
            res.body[0].total.should.equal(300.00);
            res.body[0].note.should.equal('man');
            res.body[0].methodOfPayment.should.equal('Bonifico');
            res.body[0].iva.should.equal(20.00);
            res.body[0].paid.should.equal(100);
            done();
          });
        });
      });
    });

    it('should delete a single bill on delete  /fatture/<id>', function (){
      chai.request(server)
      .get('/fatture')
      .end(function(err, res){
        chai.request(server)
        .delete('/fatture/'+ res.body[0]._id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('typeOfBill');
          res.body.should.have.property('note');
          res.body.should.have.property('methodOfPayment');
          res.body.should.have.property('iva');
          res.body.should.have.property('paid');
          res.body.should.have.property('total');
          res.body.should.have.property('numberOfBill');
          res.body.name.should.equal('PneusMarket');
          res.body.typeOfBill.should.equal('credito');
          res.body.numberOfBill.should.equal(2013);
          res.body.total.should.equal(300.00);
          res.body.note.should.equal('man');
          res.body.methodOfPayment.should.equal('Bonifico');
          res.body.iva.should.equal(20.00);
        });
      });
    });
  });
});
