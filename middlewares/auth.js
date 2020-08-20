import jwt from 'jsonwebtoken';
import config from '../config/config';

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      status: 'failed',
      msg: 'No token, authorization denied',
    });
  }

  try {
    const decoded = jwt.verify(token, config[process.env.NODE_ENV].jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      status: 'failed',
      msg: 'Invalid token',
    });
  }
};
export default auth;
