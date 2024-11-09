import { findPostBySlug, findPosts } from './post.service.js';

const getPosts = async (req, res, next) => {
  try {
    const posts = await findPosts();

    res.send({
      message: 'Posts fetched successfully',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const getDetailPost = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const post = await findPostBySlug(slug);

    res.send({
      message: 'Post fetched successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export { getPosts, getDetailPost };
