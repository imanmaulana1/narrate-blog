import { NotFoundError, UnauthorizedError } from '../../utils/error.js';
import { checkPassword, hashPassword } from '../../utils/password.js';
import {
  getUserById,
  getUserByUsername,
  updateUserById,
} from './user.repository.js';

const findUserByUsername = async (username) => {
  const user = await getUserByUsername(username);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const { password, ...userData } = user;

  return userData;
};

const updateUser = async (id, data) => {
  const user = await updateUserById(id, data);

  const { password, ...userData } = user;

  return userData;
};

const updatePassword = async (id, data) => {
  const { password } = await getUserById(id);

  const isPasswordMatch = await checkPassword(data.oldPassword, password);

  if (!isPasswordMatch) {
    throw new UnauthorizedError(
      'Your old password is incorrect. Please try again'
    );
  }

  const hashedPassword = await hashPassword(data.newPassword);

  return await updateUserById(id, { password: hashedPassword });
};

export { findUserByUsername, updateUser, updatePassword };
