import { ValidationError } from '../../utils/error.js';
import { hashPassword } from '../../utils/password.js';
import {
  getUserByEmail,
  getUserByUsername,
  insertUser,
} from './auth.repository.js';

const createUser = async (data) => {
  const isEmailExists = await getUserByEmail(data.email);
  const isUsernameExists = await getUserByUsername(data.username);

  if (isEmailExists) {
    throw new ValidationError('Email already exists');
  }

  if (isUsernameExists) {
    throw new ValidationError('Username already exists');
  }

  const hashedPassword = await hashPassword(data.password);

  return await insertUser({ ...data, password: hashedPassword });
};

const findUserByUsername = async (username) => {
  return await getUserByUsername(username);
};

const findUserByEmail = async (email) => {
  return await getUserByEmail(email);
};

export { createUser, findUserByUsername, findUserByEmail };
