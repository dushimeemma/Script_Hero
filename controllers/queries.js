import Query from '../models/Query';
import { validationResult } from 'express-validator';

class queryController {
  async getAll(req, res) {
    const queries = await Query.find();
    res.status(200).json({
      status: 'ok',
      msg: 'Retrieve query success',
      queries,
    });
  }
  async createQuery(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'failed',
        msg: errors.array(),
      });
    }
    const { email, message } = req.body;
    const newQuery = new Query({ email, message });
    const query = await newQuery.save();
    res.status(200).json({
      status: 'ok',
      msg: 'Query send success',
      query: {
        email,
        message,
      },
    });
  }
  async deleteQuery(req, res) {
    const query = await Query.findById(req.params.id);
    await query.remove();
    res.status(200).json({
      status: 'ok',
      msg: 'Success deleted',
    });
  }
}

export default queryController;
