import { Router } from 'express';
import {
  getPostBySlug,
  getAllPosts,
  updatePost,
  removePost,
} from './post.controller.js';
import { authenticateJWT } from '../../middlewares/verifyToken.js';

const router = Router();

router.get('/', getAllPosts);

router.get('/:slug', getPostBySlug);

router.patch('/:id', authenticateJWT, updatePost);

router.delete('/:id', authenticateJWT, removePost);

export default router;
