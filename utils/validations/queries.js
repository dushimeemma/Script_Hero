import { check } from 'express-validator';

export const validateQueries = [
  check('email').trim().not().isEmpty().isEmail().withMessage('Invalid email'),
  check('message').trim().not().isEmpty().withMessage('message is required'),
];
