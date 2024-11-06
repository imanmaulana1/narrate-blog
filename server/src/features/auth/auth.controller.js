import { DatabaseError, ValidationError } from '../../utils/error.js';
import { createUser } from './auth.service.js';

const registerUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

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
    if (error instanceof ValidationError)
      return res.status(error.statusCode).send({
        message: error.message,
      });

    if (error instanceof DatabaseError)
      return res.status(error.statusCode).send({
        message: error.message,
      });

    res.status(500).send({
      message: 'An unexpected error occurred',
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  res.json({
    message: 'Login',
  });
};

const getAuthenticatedUser = async (req, res) => {
  res.json({
    message: 'Me',
  });
};

export { registerUser, loginUser, getAuthenticatedUser };
