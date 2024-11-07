import { Router } from 'express';
import { changePassword, editUser, getDetailUser } from './user.controller.js';
import { authenticateJWT } from '../../middlewares/verifyToken.js';
import { validateChangePassword, validateUpdateProfile } from '../../middlewares/validateInput.js';

const router = Router();

router.get('/:username', getDetailUser);
router.patch('/profile', authenticateJWT, validateUpdateProfile, editUser);
router.patch('/change-password', authenticateJWT, validateChangePassword, changePassword);

export default router;
