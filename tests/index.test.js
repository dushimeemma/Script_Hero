const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Application', () => {
  it('it should return error if no route found', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('msg').eql('Undefined route');
        done();
      });
  });
});
