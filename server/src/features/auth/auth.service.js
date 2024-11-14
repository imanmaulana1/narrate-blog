import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../../utils/error.js';
import { generateAuthToken } from '../../utils/generateAuthToken.js';
import { checkPassword, hashPassword } from '../../utils/password.js';
import {
  findUserByEmail,
  findUserById,
  findUserByUsername,
  createNewUser,
} from './auth.repository.js';

const createUserService = async (data) => {
  const isEmailExists = await findUserByEmail(data.email);
  const isUsernameExists = await findUserByUsername(data.username);

  if (isEmailExists) {
    throw new ValidationError('Email already exists');
  }

  if (isUsernameExists) {
    throw new ValidationError('Username already exists');
  }

  const hashedPassword = await hashPassword(data.password);

  const imgUrl = `${process.env.BASE_URL}/images/default-avatar.png`;

  return await createNewUser({
    ...data,
    password: hashedPassword,
    avatar: imgUrl,
  });
};

const getUserService = async (data) => {
  const user =
    (await findUserByUsername(data.credential)) ||
    (await findUserByEmail(data.credential));

  if (!user) {
    throw new UnauthorizedError(
      `We couldn't find an account with that email/username. Please check your entry and try again`
    );
  }

  const isPasswordMatch = await checkPassword(data.password, user.password);

  if (!isPasswordMatch) {
    throw new UnauthorizedError(
      `The password you entered is incorrect. Please double-check and try again`
    );
  }

  const token = generateAuthToken(user);

  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    created_at: user.created_at,
  };

  return { userData, token };
};

const getUserByIdService = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

const getUserByUsernameService = async (username) => {
  return await findUserByUsername(username);
};

const getUserByEmailService = async (email) => {
  return await findUserByEmail(email);
};

export {
  createUserService,
  getUserService,
  getUserByIdService,
  getUserByUsernameService,
  getUserByEmailService,
};
