import { Router } from 'express';
import { getDetailPost, getPosts } from './post.controller.js';

const router = Router();

router.get('/', getPosts);

router.get('/:slug', getDetailPost);

export default router;
