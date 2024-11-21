import prisma from '../../config/database.js';
import { DatabaseError } from '../../utils/error.js';

const findAllCategories = async () => {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    throw new DatabaseError('Failed to get categories');
  }
};

const findCategoryBySlug = async (slug) => {
  try {
    return await prisma.category.findUnique({
      where: {
        slug,
      },
      include: {
        posts: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
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

            likes: {
              select: {
                user_id: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error.message);
    throw new DatabaseError('Failed to get category');
  }
};

export { findAllCategories, findCategoryBySlug };
