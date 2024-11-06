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

const router = Router();

router.post('/register', validateRegister, registerUser);

router.post('/login', validateLogin, loginUser);

router.get('/me', getAuthenticatedUser);

export default router;
