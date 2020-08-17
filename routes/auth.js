import express from 'express';
import Auth from '../controllers/auth';
import { loginValidator } from '../utils/validations/user';
import asyncHandler from '../middlewares/asyncHandler';
import auth from '../middlewares/auth';

const router = express.Router();
const user = new Auth();

router.post('/', loginValidator, asyncHandler(user.authUser));
router.get('/user', auth, asyncHandler(user.getUser));

export default router;
