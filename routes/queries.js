import express from 'express';
import { validateQueries } from '../utils/validations/queries';
import asyncHandler from '../middlewares/asyncHandler';
import auth from '../middlewares/auth';
const router = express.Router();

import Query from '../controllers/queries';

const query = new Query();

router.get('/', auth, validateQueries, asyncHandler(query.getAll));
router.post('/', validateQueries, asyncHandler(query.createQuery));
router.delete('/:id', auth, validateQueries, asyncHandler(query.deleteQuery));

export default router;
