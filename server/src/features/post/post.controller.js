import {
  updatePostService,
  getPostBySlugService,
  getAllPostsService,
  deletePostService,
  createPostService,
} from './post.service.js';

const getAllPosts = async (req, res, next) => {
  let { page, limit } = req.query;

  const parsedPage = Math.max(parseInt(page), 1);
  const parsedLimit = Math.min(Math.max(parseInt(limit), 1), 100);
  const offset = (parseInt(parsedPage) - 1) * parsedLimit || 0;

  const options = {
    page: parsedPage,
    limit: parsedLimit,
    offset,
  };

  try {
    const { posts, pagination } = await getAllPostsService(options);

    res.send({
      message: 'Posts fetched successfully',
      data: posts,
      pagination: {
        ...pagination,
        has_more: pagination.currentPage < pagination.totalPage,
      },
    });
  } catch (error) {
    console.log(error);
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
  const { id: postId } = req.params;

  let data = req.body;
  data = { ...data };

  if (data.image === 'null' || data.image === '') {
    data.image = null;
  }

  if (req.file) {
    const imgUrl = `${process.env.BASE_URL}/images/${req.file.filename}`;

    data.image = imgUrl;
  }

  try {
    const response = await updatePostService(postId, data);

    res.send({
      message: 'Post updated successfully',
      data: response,
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
