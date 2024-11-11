import { Router } from 'express';
import {
  getPostBySlug,
  getAllPosts,
  updatePost,
  removePost,
  createPost,
} from './post.controller.js';
import { authenticateJWT } from '../../middlewares/verifyToken.js';
import { verifyUser } from '../../middlewares/verifyUser.js';
import { validatePost } from '../../middlewares/validateInput.js';
import multerConfig from '../../config/multer.js';
import multer from 'multer';

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
  verifyUser,
  updatePost
);

router.delete('/:id', authenticateJWT, verifyUser, removePost);

export default router;
