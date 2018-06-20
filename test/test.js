const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;
const db = require('../server').db;
const should = chai.should();
const mongoose = require('mongoose');
let ObjectID = require('mongodb').ObjectID;

chai.use(chaiHttp);

describe('/GET events', () => {
  it('should GET all the events', (done) => {
    chai.request(server)
      .get('/events')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array')
        done();
      })

  });
});

describe ('/POST event', () => {

  let event12 = {
      title: "tie",
      description: "qwewew",
      date: "12.06.2019"
    };

  it('it should POST a event', (done) => {

      chai.request(server)
      .post('/events')
      .send(event12)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        res.body.should.have.property('date');
      done();
    });
  });
});


describe('/GET events/:id', () => {
  let test_Id = new ObjectID();

  beforeEach(function() {                // runs before each test in this block
    let event12 = {
           _id: test_Id,
          title: "title10",
          description: "Testing http protocols",
          date: "12.06.2019"
        };
    db.collection("events").insert(event12);
  });

  it('should return an event by id', (done) => {
    chai.request(server)
      .get('/events/' + test_Id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.title.should.equal("title10");
        res.body.description.should.equal("Testing http protocols");
        res.body.date.should.equal("2019-12-05T23:00:00.000Z");
        done();
      });
  });
});

describe('/PATCH events/:id', () => {
  it('should update an event', (done) => {
    chai.request(server)
      .patch('/events/5b28c4d144e27e33f1861226')
      .send({description: "ewa"})
      .end((err, res) => {
        res.should.have.status(200);
        chai.request(server)
        .get('/events/5b28c4d144e27e33f1861226')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.description.should.equal("ewa");
          done();
        });
      });
  });
});

describe('/DELETE events/:id', () => {
  it('should DELETE an event by id', (done) => {
    chai.request(server)
    .delete('/events/5b27cc236e67cb0317412505')
    .end((err, res) => {
      res.should.have.status(200);
      chai.request(server)
      .get('/events/5b27cc236e67cb0317412505')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });
  });
});
