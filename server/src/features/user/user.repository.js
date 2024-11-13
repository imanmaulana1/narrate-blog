import prisma from '../../config/database.js';
import { DatabaseError } from '../../utils/error.js';

const findAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    throw new DatabaseError('Failed to get users');
  }
};

const findUserByUsername = async (username) => {
  try {
    return await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: {
          include: {
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        },

        _count: {
          select: {
            posts: true, // pastikan nama field di schema benar
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Failed to get user');
  }
};

const findUserById = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new DatabaseError('Failed to get user');
  }
};

const updateUserById = async (id, data) => {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Failed to update user');
  }
};

export { findAllUsers, findUserByUsername, findUserById, updateUserById };
