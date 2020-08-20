import Article from '../controllers/articles';
import asyncHandler from '../middlewares/asyncHandler';
import auth from '../middlewares/auth';
import router from './auth';
import { validateArticle } from '../utils/validations/articles';

const articles = new Article();

router.get('/', asyncHandler(articles.getAll));
router.post('/', auth, validateArticle, asyncHandler(articles.createArticle));
router.put('/:id', auth, validateArticle, asyncHandler(articles.updateArticle));
router.delete('/:id', auth, asyncHandler(articles.deleteArticle));

export default router;
