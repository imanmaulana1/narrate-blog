import {
  createUserService,
  getUserByIdService,
  getUserService,
} from './auth.service.js';

const registerUser = async (req, res, next) => {
  try {
    const user = await createUserService(req.body);

    res.status(201).send({
      message: 'User created successfully',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { userData, token } = await getUserService(req.body);

    res.status(200).send({
      message: 'User logged in successfully',
      data: userData,
      token: {
        access_token: token,
        token_type: 'Bearer',
        expires_in: process.env.JWT_EXPIRES_IN,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAuthenticatedUser = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.user.id);

    res.json({
      message: `Welcome ${user.username}!`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getAuthenticatedUser };
