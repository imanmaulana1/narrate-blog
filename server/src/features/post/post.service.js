import slugify from 'slugify';
import crypto from 'crypto';
import { NotFoundError, ValidationError } from '../../utils/error.js';
import {
  deleteExistingPost,
  getPostsList,
  getPostBySlug,
  updateExistingPost,
  getPostById,
  createNewPost,
} from './post.repository.js';

const getAllPostsService = async () => {
  const posts = await getPostsList();

  return posts;
};

const getPostBySlugService = async (slug) => {
  const post = await getPostBySlug(slug);

  if (!post) {
    throw new NotFoundError(
      `Sorry, we couldn't find the post you're looking for`
    );
  }

  return post;
};

const getPostByIdService = async (postId) => {
  return await getPostById(postId);
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
  let slug = data.slug;

  if (data.title) {
    slug = slugify(data.title, { lower: true, strict: true });

    await checkSlugUnique(slug);
  }

  return await updateExistingPost(postId, { ...data, slug });
};

const deletePostService = async (postId) => {
  return await deleteExistingPost(postId);
};

const generateRandomString = () => {
  return crypto.randomBytes(3).toString('hex');
};

const checkSlugUnique = async (slug) => {
  let post = await getPostBySlug(slug);

  while (post) {
    const randomString = generateRandomString();
    const newSlug = `${slug}-${randomString}`;

    post = await getPostBySlug(newSlug);

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
