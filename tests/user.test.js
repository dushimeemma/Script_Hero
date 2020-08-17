import mongoose from 'mongoose';
import app from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../models/User';

chai.use(chaiHttp);
chai.should();

describe('Users', () => {
  beforeEach(async () => {
    try {
      const response = await chai.request(app).post('/api/users').send({
        email: 'dushimeemma@gmail.com',
        password: 'Uwaseraissa08',
      });
    } catch (error) {
      console.log(error);
    }
  });
  describe('GET user', () => {
    it('it should not get user without token', (done) => {
      chai
        .request(app)
        .get('/api/auth/user')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(401);
          res.body.should.have.property('status').eql('failed');
          res.body.should.have
            .property('msg')
            .eql('No token, authorization denied');
          done();
        });
    });
  });
});
