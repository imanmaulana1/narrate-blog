import slugify from 'slugify';
import { NotFoundError, ValidationError } from '../../utils/error.js';
import {
  deleteExistingPost,
  getPostsList,
  getPostBySlug,
  updateExistingPost,
  getPostById,
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

const getPostByIdService = async (id) => {
  return await getPostById(id);
};

const updatePostService = async (id, data) => {
  let slug = data.slug;

  if (data.title) {
    slug = slugify(data.title, { lower: true, strict: true });

    await checkSlugUnique(slug, id);
  }

  return await updateExistingPost(id, { ...data, slug });
};

const deletePostService = async (id) => {
  return await deleteExistingPost(id);
};

const checkSlugUnique = async (slug, postId) => {
  const post = await getPostBySlug(slug);
  if (post && post.id !== postId) {
    throw new ValidationError('Post with this title already exists');
  }
};

export {
  getAllPostsService,
  getPostBySlugService,
  getPostByIdService,
  updatePostService,
  deletePostService,
};
