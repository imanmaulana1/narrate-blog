import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../../utils/error.js';
import { generateAuthToken } from '../../utils/generateAuthToken.js';
import { checkPassword, hashPassword } from '../../utils/password.js';
import {
  getUserByEmail,
  getUserById,
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

const getUser = async (data) => {
  const user =
    (await getUserByUsername(data.credential)) ||
    (await getUserByEmail(data.credential));

  if (!user) {
    throw new UnauthorizedError(
      `We couldn't find an account with that email/username. Please check your entry and try again`
    );
  }

  const isPasswordMatch = await checkPassword(data.password, user.password);

  if (!isPasswordMatch) {
    throw new UnauthorizedError(
      'The password you entered is incorrect. Please double-check and try again'
    );
  }

  const token = generateAuthToken(user);

  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at,
  };

  return { userData, token };
};

const findUserById = async (id) => {
  const user = await getUserById(id);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

const findUserByUsername = async (username) => {
  return await getUserByUsername(username);
};

const findUserByEmail = async (email) => {
  return await getUserByEmail(email);
};

export {
  createUser,
  getUser,
  findUserById,
  findUserByUsername,
  findUserByEmail,
};
