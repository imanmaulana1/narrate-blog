import { getPostByIdService } from '../features/post/post.service.js';
import { ForbiddenError, NotFoundError } from '../utils/error.js';

export const verifyAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const post = await getPostByIdService(id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    if (req.method === 'POST' && req.url.includes('/like')) {
      if (post.author_id === userId) {
        throw new ForbiddenError('You cannot like your own post');
      }
    }

    if (
      (req.method === 'PUT' || req.method === 'DELETE') &&
      post.author_id !== userId
    ) {
      throw new ForbiddenError('You are not authorized to modify this post');
    }

    next();
  } catch (error) {
    next(error);
  }
};
