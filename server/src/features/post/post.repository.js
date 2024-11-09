import prisma from '../../config/database.js';
import { DatabaseError } from '../../utils/error.js';

const getAllPosts = async () => {
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

const getPostsBySlug = async (slug) => {
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
        comments: {
          select: {
            id: true,
            content: true,
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

export { getAllPosts, getPostsBySlug };
