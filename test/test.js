const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET events', () => {
  it('should GET all the events', (done) => {
    chai.request(server)
      .get('/events')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })

  });
});

describe ('/POST event', () => {
  
  it('it should POST a event', (done) => {
    let event12 = {
      title: "tie",
      description: "qwewew",
      date: "12.06.2019"
    }

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
  it('should return an event by id', (done) => {
    chai.request(server)
      .get('/events/5b28c4d144e27e33f1861226')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
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
    .delete('/events/5b227d496b61f031aa88168c')
    .end((err, res) => {
      res.should.have.status(200);
      chai.request(server)
      .get('/events/5b227d496b61f031aa88168c')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });
  });
});
