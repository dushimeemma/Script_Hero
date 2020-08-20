import Article from '../models/Article';
import { validationResult } from 'express-validator';

class articleController {
  async getAll(req, res) {
    const articles = await Article.find();
    res.status(200).json({
      status: 'ok',
      msg: 'Article fetch success',
      articles,
    });
  }
  async createArticle(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'failed',
        msg: errors.array(),
      });
    }
    const { title, body } = req.body;
    const newArticle = new Article({ title, body });
    const article = await newArticle.save();
    res.status(200).json({
      status: 'ok',
      msg: 'Success created article',
      article,
    });
  }
  async updateArticle(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'failed',
        msg: errors.array(),
      });
    }
    const { title, body } = req.body;
    const article = await Article.findById(req.params.id);
    article.title = title;
    article.body = body;
    await article.save();
    res.status(200).json({
      status: 'ok',
      msg: 'Success updated article',
    });
  }
  async deleteArticle(req, res) {
    const article = await Article.findById(req.params.id);
    article.remove();
    res.status(200).json({
      status: 'ok',
      msg: 'Success deleted article',
    });
  }
}

export default articleController;
