import { Router } from 'express';
import {
  getPostBySlug,
  getAllPosts,
  updatePost,
  removePost,
} from './post.controller.js';
import { authenticateJWT } from '../../middlewares/verifyToken.js';
import { verifyUser } from '../../middlewares/verifyUser.js';

const router = Router();

router.get('/', getAllPosts);

router.get('/:slug', getPostBySlug);

router.patch('/:id', authenticateJWT, verifyUser, updatePost);

router.delete('/:id', authenticateJWT, verifyUser, removePost);

export default router;
