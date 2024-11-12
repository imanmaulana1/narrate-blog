import { getCommentByIdService } from '../features/post/post.service.js';
import { ForbiddenError, NotFoundError } from '../utils/error.js';

const verifyCommentAuthor = async (req, res, next) => {
  const { id, commentId } = req.params;
  const { id: userId } = req.user;

  try {
    const comment = await getCommentByIdService(commentId);

    if (!comment || comment.post_id !== id) {
      throw new NotFoundError('Comment not found');
    }

    if (comment.author_id !== userId) {
      throw new ForbiddenError('You are not authorized to modify this comment');
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default verifyCommentAuthor;
