import { Router } from 'express';
import {
  getPostBySlug,
  getAllPosts,
  updatePost,
  removePost,
  createPost,
  likePost,
} from './post.controller.js';
import { authenticateJWT } from '../../middlewares/verifyToken.js';
import { verifyAuthor } from '../../middlewares/verifyAuthor.js';
import { validatePost } from '../../middlewares/validateInput.js';
import multerConfig from '../../config/multer.js';

const router = Router();

router.get('/', getAllPosts);

router.post(
  '/',
  authenticateJWT,
  multerConfig.single('image'),
  validatePost,
  createPost
);

router.get('/:slug', getPostBySlug);

router.patch(
  '/:id',
  authenticateJWT,
  multerConfig.single('image'),
  verifyAuthor,
  updatePost
);

router.delete('/:id', authenticateJWT, verifyAuthor, removePost);

router.post('/:id/like', authenticateJWT, verifyAuthor, likePost);

export default router;
