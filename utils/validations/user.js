import { check } from 'express-validator';

export const signupValidator = [
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be atleast 8 characters')
    .custom((password) => {
      const alphaNumericRegix = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
      if (!alphaNumericRegix) {
        throw new Error('Password must contains letters and numbers');
      }
      if (password.toUpperCase() === password) {
        throw new Error(
          'Password must contain atleast one lowercase character'
        );
      }
      if (password.toLowerCase() === password) {
        throw new Error(
          'Password must contain atleast one uppercase character'
        );
      }
      return true;
    }),
];
export const loginValidator = [
  check('email').trim().not().isEmpty().withMessage('Email is required'),
  check('password').trim().not().isEmpty().withMessage('Password is required'),
];
