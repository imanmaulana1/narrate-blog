import { NotFoundError, UnauthorizedError } from '../../utils/error.js';
import { checkPassword, hashPassword } from '../../utils/password.js';
import {
  findAllUsers,
  findUserById,
  findUserByUsername,
  updateUserById,
} from './user.repository.js';

const getAllUsersService = async () => {
  const users = await findAllUsers();

  const userData = users.map((user) => {
    const { password, ...userData } = user;
    return userData;
  });

  return userData;
};

const getUserByUsernameService = async (username) => {
  const user = await findUserByUsername(username);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const { password, ...userData } = user;

  return userData;
};

const updateUserService = async (id, data) => {
  const user = await updateUserById(id, data);

  const { password, ...userData } = user;

  return userData;
};

const updatePasswordService = async (id, data) => {
  const { password } = await findUserById(id);

  const isPasswordMatch = await checkPassword(data.oldPassword, password);

  if (!isPasswordMatch) {
    throw new UnauthorizedError(
      'Your old password is incorrect. Please try again'
    );
  }

  const hashedPassword = await hashPassword(data.newPassword);

  return await updateUserById(id, { password: hashedPassword });
};

const updateAvatarService = async (id, avatar) => {
  const user = await updateUserById(id, { avatar });

  return user;
};

export {
  getAllUsersService,
  getUserByUsernameService,
  updateUserService,
  updateAvatarService,
  updatePasswordService,
};
