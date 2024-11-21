import slugify from 'slugify';
import crypto from 'crypto';
import { NotFoundError } from '../../utils/error.js';
import {
  countPosts,
  createNewPost,
  createLikePost,
  deleteExistingPost,
  deleteLikePost,
  existingUserLike,
  findAllPosts,
  findPostById,
  findPostBySlug,
  updateExistingPost,
  findAllComments,
  createNewComment,
  findCommentById,
  deleteComment,
  updateComment,
  randomPosts,
} from './post.repository.js';
import { calculatedReadTime, truncateText } from '../../utils/helper.js';

const getAllPostsService = async (options) => {
  const [count, posts] = await Promise.all([
    countPosts(),
    findAllPosts({
      offset: options.offset,
      limit: options.limit || 10,
      orderBy: options.orderBy,
      sortBy: options.sortBy,
    }),
  ]);

  const totalPage = Math.ceil(count / options.limit);

  options.total = count;
  options.totalPage = totalPage;

  const pagination = {
    currentPage: options.page || 1,
    totalPage: totalPage || 1,
    totalData: count,
    limit: options.limit || 10,
    offset: options.offset || 0,
  };

  const data = posts?.map((post) => {
    return {
      ...post,
      short_content: truncateText(post.content, 100),
      estimated_read_time: calculatedReadTime(post.content),
    };
  });

  return { data, pagination };
};

const getPostByIdService = async (id) => {
  return await findPostById(id);
};

const getPostBySlugService = async (slug) => {
  const post = await findPostBySlug(slug);

  if (!post) {
    throw new NotFoundError(
      `Sorry, we couldn't find the post you're looking for`
    );
  }

  const data = {
    ...post,
    estimated_read_time: calculatedReadTime(post.content),
  };

  return data;
};

const getRandomPostsService = async () => {
  return await randomPosts();
};

const createPostService = async (userId, data) => {
  let slugGenerate = slugify(data.title, { lower: true, strict: true });

  try {
    const slug = await checkSlugUnique(slugGenerate);

    const payload = {
      ...data,
      slug,
      author_id: userId,
    };
    const post = await createNewPost(payload);

    return post;
  } catch (error) {
    console.log(error);
  }
};

const updatePostService = async (postId, data) => {
  if (!data.title) {
    return await updateExistingPost(postId, { ...data });
  }

  const generateSlug = slugify(data.title, { lower: true, strict: true });

  const slug = await checkSlugUnique(generateSlug);

  return await updateExistingPost(postId, { ...data, slug });
};

const deletePostService = async (postId) => {
  return await deleteExistingPost(postId);
};

const getAllCommentsService = async (postId) => {
  return await findAllComments(postId);
};

const getCommentByIdService = async (id) => {
  return await findCommentById(id);
};

const createCommentService = async (data) => {
  return await createNewComment(data);
};

const updateCommentService = async (id, data) => {
  return await updateComment(id, data);
};

const deleteCommentService = async (commentId) => {
  return await deleteComment(commentId);
};

const likePostService = async (userId, postId) => {
  const isUserLiked = await existingUserLike(postId, userId);

  if (!isUserLiked) {
    const createdLike = await createLikePost(postId, userId);
    return {
      message: 'Post liked successfully',
      data: { ...createdLike, hasLiked: true },
    };
  }

  const deletedLike = await deleteLikePost(postId, userId);

  return {
    message: 'Post unliked successfully',
    data: { ...deletedLike, hasLiked: false },
  };
};

const generateRandomString = () => {
  return crypto.randomBytes(3).toString('hex');
};

const checkSlugUnique = async (slug) => {
  let post = await findPostBySlug(slug);

  while (post) {
    const randomString = generateRandomString();
    const newSlug = `${slug}-${randomString}`;

    post = await findPostBySlug(newSlug);

    if (!post) {
      slug = newSlug;

      break;
    }
  }

  return slug;
};

export {
  createPostService,
  createCommentService,
  deletePostService,
  deleteCommentService,
  getAllPostsService,
  getAllCommentsService,
  getPostByIdService,
  getPostBySlugService,
  getCommentByIdService,
  getRandomPostsService,
  likePostService,
  updatePostService,
  updateCommentService,
};
