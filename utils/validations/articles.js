import { check } from 'express-validator';

export const validateArticle = [
  check('title').trim().not().isEmpty().withMessage('Title is required'),
  check('body').trim().not().isEmpty().withMessage('Body is required'),
];
