import { Router } from 'express';
import {
  getPostBySlug,
  getAllPosts,
  updatePost,
  removePost,
  createPost,
  likePost,
  getComments,
  createComment,
  updateComment,
  removeComment,
} from './post.controller.js';
import { authenticateJWT } from '../../middlewares/verifyToken.js';
import verifyPostAuthor from '../../middlewares/verifyPostAuthor.js';
import verifyCommentAuthor from '../../middlewares/verifyCommentAuthor.js';
import {
  validateComment,
  validatePost,
} from '../../middlewares/validateInput.js';
import multerConfig from '../../config/multer.js';
import verifyLikeAuthor from '../../middlewares/verifyLikeAuthor.js';

const router = Router();

// CRUD POST
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
  verifyPostAuthor,
  updatePost
);
router.delete('/:id', authenticateJWT, verifyPostAuthor, removePost);

// LIKES
router.post('/:id/like', authenticateJWT, verifyLikeAuthor, likePost);

// CRUD COMMENT
router.get('/:id/comments', getComments);
router.post('/:id/comments', authenticateJWT, validateComment, createComment);
router.patch(
  '/:id/comments/:commentId',
  authenticateJWT,
  verifyCommentAuthor,
  validateComment,
  updateComment
);
router.delete(
  '/:id/comments/:commentId',
  authenticateJWT,
  verifyCommentAuthor,
  removeComment
);

export default router;
