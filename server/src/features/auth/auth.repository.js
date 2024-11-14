import prisma from '../../config/database.js';
import { DatabaseError } from '../../utils/error.js';

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

const findUserByEmail = async (email) => {
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

const findUserByUsername = async (username) => {
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

const createNewUser = async ({ username, email, password, avatar }) => {
  try {
    return await prisma.user.create({
      data: {
        username,
        email,
        password,
        avatar,
      },
    });
  } catch (error) {
    throw new DatabaseError('Failed to insert user');
  }
};

export { findUserById, findUserByEmail, findUserByUsername, createNewUser };
