import User from '../../models/User';
import app from '../../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

chai.use(chaiHttp);
let should = chai.should();

describe('User', () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });
  describe('/POST user', () => {
    it('should not create user with existing email', (done) => {
      let user = new User({
        name: 'Test Test',
        email: 'test@test.com',
        password: 'Password@1994',
      });
      user.save((err, user) => {
        let email = user.email;
        let checkUser = User.findOne({ email });
        if (checkUser) {
          chai
            .request(app)
            .post('/api/auth/signup')
            .send({
              name: 'Test Test',
              email: 'test@test.com',
              password: 'Password@1994',
            })
            .end((err, res) => {
              if (err) {
                done(err);
              }
              res.should.have.status(400);
              done();
            });
        }
      });
    });
  });

  describe('/POST /api/auth/signup', () => {
    it('should not create a new user without password', (done) => {
      let newUser = new User({
        name: 'Test Test',
        email: 'newtest@test.com',
        //   password: 'Password@1994',
      });
      chai
        .request(app)
        .post('/api/auth/signup')
        .send(newUser)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST /api/auth/signup', () => {
    it('should create a new user', (done) => {
      let newUser = new User({
        name: 'Test Test',
        email: 'test@test.com',
        password: 'Password@1994',
      });
      chai
        .request(app)
        .post('/api/auth/signup')
        .send(newUser)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
  /* describe('/POST login', () => {
    it('should login', (done) => {
      chai
        .request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'Password@1994' })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('POST /api/auth/login', () => {
    it('should not login without password', (done) => {
      chai
        .request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com' })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(400);
          done();
        });
    });
  }); */
});
