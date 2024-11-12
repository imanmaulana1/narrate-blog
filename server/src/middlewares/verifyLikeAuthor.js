import { getPostByIdService } from '../features/post/post.service.js';
import { ForbiddenError, NotFoundError } from '../utils/error.js';

const verifyLikeAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const post = await getPostByIdService(id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    if (post.author_id === userId) {
      throw new ForbiddenError('You cannot like your own post');
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default verifyLikeAuthor;
