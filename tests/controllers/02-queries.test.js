import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../../models/User';
import Query from '../../models/Query';
import app from '../../index';

chai.use(chaiHttp);
let should = chai.should();

describe('Query', () => {
  let newUser = {
    email: 'test@test.com',
    password: 'Uwaseraissa08',
  };
  let jwt;
  before(async () => {
    let res = await chai.request(app).post('/api/auth/login').send(newUser);
    jwt = res.body.token;
  });
  beforeEach((done) => {
    Query.deleteMany({}, (err) => {
      done();
    });
  });
  describe('/POST query', () => {
    it('should not post a new query without email', (done) => {
      let query = new Query({
        message: 'new message for test',
      });
      chai
        .request(app)
        .post('/api/queries')
        .send(query)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('/POST query', () => {
    it('should post a new query', (done) => {
      let query = new Query({
        email: 'test@test.com',
        message: 'new message for test',
      });
      chai
        .request(app)
        .post('/api/queries')
        .send(query)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/GET queries', () => {
    it('should get all queries', (done) => {
      chai
        .request(app)
        .get('/api/queries')
        .set('x-auth-token', jwt)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/DELETE/:id query ', () => {
    it('should delete a query given id', (done) => {
      let query = new Query({
        email: 'test@test.com',
        message: 'new message for test',
      });
      query.save((err, query) => {
        chai
          .request(app)
          .delete(`/api/queries/${query._id}`)
          .set('x-auth-token', jwt)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});
