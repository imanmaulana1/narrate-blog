import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getAuthenticatedUser,
} from './auth.controller.js';
import { validateRegister } from '../../middlewares/validateAuth.js';

const router = Router();

router.post('/register', validateRegister, registerUser);

router.post('/login', loginUser);

router.get('/me', getAuthenticatedUser);

export default router;
