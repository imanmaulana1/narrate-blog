import slugify from 'slugify';
import crypto from 'crypto';
import { NotFoundError } from '../../utils/error.js';
import {
  deleteExistingPost,
  findAllPosts,
  findPostBySlug,
  updateExistingPost,
  findPostById,
  createNewPost,
  countPosts,
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

  return { posts, pagination };
};

const getPostBySlugService = async (slug) => {
  const post = await findPostBySlug(slug);

  if (!post) {
    throw new NotFoundError(
      `Sorry, we couldn't find the post you're looking for`
    );
  }

  return post;
};

const getPostByIdService = async (postId) => {
  return await findPostById(postId);
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
  getAllPostsService,
  getPostBySlugService,
  getPostByIdService,
  updatePostService,
  deletePostService,
};
