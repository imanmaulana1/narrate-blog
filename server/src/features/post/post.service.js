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
} from './post.repository.js';

const getAllPostsService = async (options) => {
  const count = await countPosts();
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

  const posts = await findAllPosts({
    offset: pagination.offset,
    limit: pagination.limit,
  });

  const data = posts.map((post) => {
    return {
      ...post,
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
      data: createdLike,
    };
  }

  const deletedLike = await deleteLikePost(postId, userId);

  return {
    message: 'Post unliked successfully',
    data: deletedLike,
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

const calculatedReadTime = (content) => {
  const wordPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordPerMinute);

  return `${minutes} min read`;
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
  likePostService,
  updatePostService,
  updateCommentService,
};
