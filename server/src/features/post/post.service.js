import { NotFoundError } from '../../utils/error.js';
import { getAllPosts, getPostsBySlug } from './post.repository.js';

const findPosts = async () => {
  const posts = await getAllPosts();

  return posts;
};

const findPostBySlug = async (slug) => {
  const post = await getPostsBySlug(slug);

  if (!post) {
    throw new NotFoundError(`Sorry, we couldn't find the post you're looking for`);
  }

  return post;
};

export { findPosts, findPostBySlug };
