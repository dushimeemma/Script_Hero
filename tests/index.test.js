import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Application', () => {
  it('it should return welcome to KIGC | BLOG', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have.property('msg').eql('Welcome to KIGC | BLOG');
        done();
      });
  });
});
