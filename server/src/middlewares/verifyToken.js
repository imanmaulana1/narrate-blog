import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/error.js';

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('Access denied. Please log in to continue');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new UnauthorizedError('Access denied. Please log in to continue');
    }

    req.user = decoded;

    next();
  });
};
