import {
  updatePostService,
  getPostBySlugService,
  getAllPostsService,
  deletePostService,
  createPostService,
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

const createPost = async (req, res, next) => {
  const { id: userId } = req.user;
  let data = req.body;
  data = { ...data };

  if (req.file) {
    const imgUrl = `${process.env.BASE_URL}/images/${req.file.filename}`;

    data.image = imgUrl;
  }

  try {
    const post = await createPostService(userId, data);

    res.status(201).send({
      message: 'Post created successfully',
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

export { createPost, getAllPosts, getPostBySlug, updatePost, removePost };
