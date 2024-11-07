import {
  DatabaseError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../utils/error.js';

export const errorHandler = (error, req, res, next) => {
  if (error.isJoi) {
    const errors = error.details.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof UnauthorizedError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof DatabaseError) {
    return res.status(error.statusCode).json({
      success: false,
      message: 'An internal server error occurred',
    });
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    return res
      .status(400)
      .json({ success: false, error: 'File size exceeds the 1MB limit' });
  }

  res.status(500).json({ error: 'An unexpected error occurred' });
};
