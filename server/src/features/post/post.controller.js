import {
  updatePostService,
  getPostBySlugService,
  getAllPostsService,
  deletePostService,
} from './post.service.js';

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await getAllPostsService();

    res.send({
      message: 'Posts fetched successfully',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const getPostBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const post = await getPostBySlugService(slug);

    res.send({
      message: 'Post fetched successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await updatePostService(id, req.body);

    res.send({
      message: 'Post updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const removePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deletePostService(id);

    res.send({
      message: 'Your post has been successfully deleted',
    });
  } catch (error) {
    next(error);
  }
};

export { getAllPosts, getPostBySlug, updatePost, removePost };
