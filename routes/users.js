import express from 'express';
import User from '../controllers/user';
import { signupValidator } from '../utils/validations/user';
import asyncHandler from '../middlewares/asyncHandler';

const router = express.Router();
const user = new User();

router.post('/', signupValidator, asyncHandler(user.createUser));

export default router;
