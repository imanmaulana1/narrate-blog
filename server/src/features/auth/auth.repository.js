import prisma from '../../config/database.js';
import { DatabaseError } from '../../utils/error.js';

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

const getUserByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    throw new DatabaseError('Failed to get user');
  }
};

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

const insertUser = async ({ name, username, email, password }) => {
  try {
    return await prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
      },
    });
  } catch (error) {
    throw new DatabaseError('Failed to insert user');
  }
};

export { getUserById, getUserByEmail, getUserByUsername, insertUser };
