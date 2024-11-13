import {
  getAllUsersService,
  getUserByUsernameService,
  updateAvatarService,
  updatePasswordService,
  updateUserService,
} from './user.service.js';

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();

    res.json({
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getDetailUser = async (req, res, next) => {
  let { username } = req.params;

  if (username.startsWith('@')) {
    username = username.slice(1);
  }

  try {
    const user = await getUserByUsernameService(username);

    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUserDetails = async (req, res, next) => {
  const { id } = req.user;

  const data = await updateUserService(id, req.body);

  try {
    res.send({
      message: 'User updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserPassword = async (req, res, next) => {
  const { id } = req.user;

  try {
    await updatePasswordService(id, req.body);

    res.send({
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { id } = req.user;

  if (!req.file) {
    return res.status(400).send({
      message: 'No file uploaded',
    });
  }

  const imgUrl = `${process.env.BASE_URL}/images/${req.file.filename}`;

  try {
    const data = await updateAvatarService(id, imgUrl);

    res.send({
      message: 'Your profile picture has been updated successfully!',
      data: {
        id: data.id,
        username: data.username,
        avatar: data.avatar,
        updated_at: data.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllUsers,
  getDetailUser,
  updateUserDetails,
  updateUserPassword,
  updateUserAvatar,
};
