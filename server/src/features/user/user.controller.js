import {
  findUserByUsername,
  updatePassword,
  updateUser,
} from './user.service.js';

const getDetailUser = async (req, res, next) => {
  let { username } = req.params;

  if (username.startsWith('@')) {
    username = username.slice(1);
  }

  try {
    const user = await findUserByUsername(username);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  const { id } = req.user;

  const data = await updateUser(id, req.body);

  try {
    res.send({
      message: 'User updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { id } = req.user;

  try {
    await updatePassword(id, req.body);

    res.send({
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export { getDetailUser, editUser, changePassword };
