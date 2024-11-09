import prisma from '../../config/database.js';
import { DatabaseError, NotFoundError } from '../../utils/error.js';

const getPostsList = async () => {
  try {
    return await prisma.post.findMany({
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
    throw new DatabaseError('Failed to get posts');
  }
};

const getPostBySlug = async (slug) => {
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

const getPostById = async (id) => {
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

const updatePostCategoryAssignment = async (postId, categoryId) => {
  try {
    return await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        category_id: categoryId,
      },
    });
  } catch (error) {
    throw new DatabaseError('Failed to update category post');
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

export {
  createNewPost,
  deleteExistingPost,
  getPostsList,
  getPostBySlug,
  getPostById,
  updateExistingPost,
  updatePostCategoryAssignment,
};
