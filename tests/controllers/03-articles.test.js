import chai from 'chai';
import chaiHttp from 'chai-http';
import Article from '../../models/Article';
import User from '../../models/User';
import app from '../../index';
import mongoose from 'mongoose';

let should = chai.should();
chai.use(chaiHttp);

describe('Article', () => {
  let newUser = {
    email: 'test@test.com',
    password: 'Uwaseraissa08',
  };
  let jwt;
  before(async () => {
    const res = await chai.request(app).post('/api/auth/login').send(newUser);
    jwt = res.body.token;
  });
  beforeEach((done) => {
    Article.deleteMany({}, (err) => {
      done();
    });
  });
  describe('/GET article', () => {
    it('should get all articles', (done) => {
      chai
        .request(app)
        .get('/api/articles')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('/POST article', () => {
    it('should not add an article without title', (done) => {
      let newArticle = {
        body: 'Post for testing POST end point',
      };
      chai
        .request(app)
        .post('/api/articles')
        .set('x-auth-token', jwt)
        .send(newArticle)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST article', () => {
    it('should add an article', (done) => {
      let newArticle = {
        title: 'Post Test',
        body: 'Post for testing POST end point',
      };
      chai
        .request(app)
        .post('/api/articles')
        .set('x-auth-token', jwt)
        .send(newArticle)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/DELETE/:id article', () => {
    it('should delete an article given id', (done) => {
      let article = new Article({
        title: 'Article Test',
        body: 'Article for testing my endpoints',
      });
      article.save((err, article) => {
        chai
          .request(app)
          .delete(`/api/articles/${article._id}`)
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
  describe('/PUT/:id article', () => {
    it('should not update article given id without title', (done) => {
      let article = new Article({
        title: 'Article to update',
        body: 'Update article test',
      });
      article.save((err, article) => {
        chai
          .request(app)
          .put(`/api/articles/${article._id}`)
          .set('x-auth-token', jwt)
          .send({
            body: 'Update article test Update',
          })
          .end((err, res) => {
            if (err) {
              done(err);
            }
            res.should.have.status(400);
            done();
          });
      });
    });
  });
  describe('/PUT/:id article', () => {
    it('should update article given id', (done) => {
      let article = new Article({
        title: 'Article to update',
        body: 'Update article test',
      });
      article.save((err, article) => {
        chai
          .request(app)
          .put(`/api/articles/${article._id}`)
          .set('x-auth-token', jwt)
          .send({
            title: 'Article to update Update',
            body: 'Update article test Update',
          })
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
