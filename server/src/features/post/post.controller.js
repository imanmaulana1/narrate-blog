import {
  updatePostService,
  getPostBySlugService,
  getAllPostsService,
  deletePostService,
  createPostService,
  likePostService,
  getAllCommentsService,
  createCommentService,
  deleteCommentService,
  updateCommentService,
  getRandomPostsService,
} from './post.service.js';

// CRUD POST
const getAllPosts = async (req, res, next) => {
  let { page, order, sort } = req.query;

  const parsedPage = Math.max(Number(page) || 1, 1);
  const limit = 10;
  const offset = (parseInt(parsedPage) - 1) * limit;
  const validOrders = ['asc', 'desc'];
  const validSorts = ['created_at', 'views'];

  const orderBy = validOrders.includes(order) ? order : 'asc';
  const sortBy = validSorts.includes(sort) ? sort : 'created_at';

  const options = {
    page: parsedPage,
    limit,
    offset,
    orderBy,
    sortBy,
  };

  try {
    const { data, pagination } = await getAllPostsService(options);

    res.send({
      message: 'Posts fetched successfully',
      data,
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
    const data = await getPostBySlugService(slug);

    res.send({
      message: 'Post fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const randomPosts = async (req, res, next) => {
  try {
    const data = await getRandomPostsService();

    res.send({
      message: 'Posts fetched successfully',
      data,
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

// LIKE / UNLIKE POST
const likePost = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: postId } = req.params;

  try {
    const { message, data } = await likePostService(userId, postId);

    res.send({
      message,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// CRUD COMMENT
const getComments = async (req, res, next) => {
  const { id: postId } = req.params;

  try {
    const data = await getAllCommentsService(postId);

    res.send({
      message: 'Comments fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  let data = req.body;
  data = { ...data, post_id: postId, author_id: userId };

  try {
    const comment = await createCommentService(data);

    res.status(201).send({
      message: 'Comment created successfully',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const data = await updateCommentService(commentId, content);

    res.send({
      message: 'Comment updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const removeComment = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    await deleteCommentService(commentId);

    res.send({
      message: 'Your comment has been successfully deleted',
    });
  } catch (error) {
    next(error);
  }
};

export {
  createPost,
  createComment,
  getAllPosts,
  getComments,
  getPostBySlug,
  updatePost,
  updateComment,
  randomPosts,
  removePost,
  removeComment,
  likePost,
};
