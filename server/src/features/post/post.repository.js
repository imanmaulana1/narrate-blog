import prisma from '../../config/database.js';
import { DatabaseError, NotFoundError } from '../../utils/error.js';

const findAllPosts = async ({ offset, limit }) => {
  try {
    return await prisma.post.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        image: true,
        created_at: true,
        updated_at: true,
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        views: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  } catch (error) {
    throw new DatabaseError(`Failed to get posts: ${error.message}`);
  }
};

const findPostBySlug = async (slug) => {
  try {
    return await prisma.post.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        image: true,
        created_at: true,
        updated_at: true,
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  } catch (error) {
    throw new DatabaseError('Failed to get post');
  }
};

const findPostById = async (id) => {
  try {
    return await prisma.post.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new DatabaseError('Failed to get post');
  }
};

const createNewPost = async (data) => {
  try {
    return await prisma.post.create({
      data,
    });
  } catch (error) {
    throw new DatabaseError('Failed to create post');
  }
};

const updateExistingPost = async (id, data) => {
  try {
    return await prisma.post.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      throw new NotFoundError(
        `Sorry, the user record you're trying to update doesn't exist. Please check the information and try again`
      );
    }
    throw new DatabaseError('Failed to update post');
  }
};

const deleteExistingPost = async (id) => {
  try {
    await prisma.comment.deleteMany({
      where: {
        post_id: id,
      },
    });

    await prisma.postLike.deleteMany({
      where: {
        post_id: id,
      },
    });

    return await prisma.post.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      throw new NotFoundError(
        'The post has already been deleted or does not exist'
      );
    }
    throw new DatabaseError('Failed to delete post');
  }
};

const countPosts = async () => {
  try {
    return await prisma.post.count();
  } catch (error) {
    throw new DatabaseError('Failed to count posts');
  }
};

const existingUserLike = async (postId, userId) => {
  try {
    return await prisma.postLike.findUnique({
      where: {
        post_id_user_id: {
          post_id: postId,
          user_id: userId,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Failed to get post like');
  }
};

const createLikePost = async (postId, userId) => {
  try {
    return await prisma.postLike.create({
      data: {
        post_id: postId,
        user_id: userId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Failed to create post like');
  }
};

const deleteLikePost = async (postId, userId) => {
  try {
    return await prisma.postLike.delete({
      where: {
        post_id_user_id: {
          post_id: postId,
          user_id: userId,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Failed to delete post like');
  }
};

export {
  createNewPost,
  createLikePost,
  countPosts,
  deleteExistingPost,
  deleteLikePost,
  existingUserLike,
  findAllPosts,
  findPostBySlug,
  findPostById,
  updateExistingPost,
};
