import User from '../models/User';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';

class authController {
  async createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'failed',
        msg: errors.array(),
      });
    }
    const { name, email, password } = req.body;
    const cUser = await User.findOne({ email });
    if (cUser) {
      return res.status(400).json({
        status: 'failed',
        msg: 'Email is used by another account',
      });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);
    newUser.password = hash;
    const user = await newUser.save();
    const token = jwt.sign(
      { id: user.id },
      config[process.env.NODE_ENV].jwtSecret,
      {
        expiresIn: 3600,
      }
    );
    res.status(200).json({
      status: 'ok',
      msg: 'User created',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }

  async authUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'failed',
        msg: errors.array(),
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        msg: 'User does not exists',
      });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'failed',
        msg: 'Invalid credentials',
      });
    }
    const token = jwt.sign(
      { id: user.id },
      config[process.env.NODE_ENV].jwtSecret,
      {
        expiresIn: 3600,
      }
    );
    res.status(200).json({
      status: 'ok',
      msg: 'User logged in success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }

  async getUser(req, res) {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      status: 'ok',
      msg: 'User verified',
      user,
    });
  }
}
export default authController;
