import express from 'express';
import Auth from '../controllers/auth';
import { loginValidator, signupValidator } from '../utils/validations/user';
import asyncHandler from '../middlewares/asyncHandler';
import auth from '../middlewares/auth';

const router = express.Router();
const user = new Auth();

router.post('/signup', signupValidator, asyncHandler(user.createUser));
router.post('/login', loginValidator, asyncHandler(user.authUser));
router.get('/user', auth, asyncHandler(user.getUser));

export default router;
