import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getAuthenticatedUser,
} from './auth.controller.js';
import {
  validateLogin,
  validateRegister,
} from '../../middlewares/validateAuth.js';
import { authenticateJWT } from '../../middlewares/verifyToken.js';

const router = Router();

router.post('/register', validateRegister, registerUser);

router.post('/login', validateLogin, loginUser);

router.get('/me', authenticateJWT ,getAuthenticatedUser);

export default router;
