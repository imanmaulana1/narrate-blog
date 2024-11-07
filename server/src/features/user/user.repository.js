import prisma from '../../config/database.js';
import { DatabaseError } from '../../utils/error.js';

const getUserByUsername = async (username) => {
  try {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  } catch (error) {
    throw new DatabaseError('Failed to get user');
  }
};

const getUserById = async (id) => {
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
    throw new DatabaseError('Failed to update user');
  }
};

export { getUserByUsername, getUserById, updateUserById };
