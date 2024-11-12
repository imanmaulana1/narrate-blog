import { getPostByIdService } from '../features/post/post.service.js';
import { ForbiddenError, NotFoundError } from '../utils/error.js';

const verifyPostAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const post = await getPostByIdService(id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    if (post.author_id !== userId) {
      throw new ForbiddenError('You are not authorized to modify this post');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyPostAuthor;
