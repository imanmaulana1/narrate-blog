import { Router } from 'express';

import {
  changePassword,
  editUser,
  getDetailUser,
  uploadAvatar,
} from './user.controller.js';
import { authenticateJWT } from '../../middlewares/verifyToken.js';
import {
  validateChangePassword,
  validateUpdateProfile,
} from '../../middlewares/validateInput.js';
import multerConfig from '../../config/multer.js';

const router = Router();

router.get('/:username', getDetailUser);
router.patch('/profile', authenticateJWT, validateUpdateProfile, editUser);
router.patch(
  '/change-password',
  authenticateJWT,
  validateChangePassword,
  changePassword
);
router.patch(
  '/upload-avatar',
  authenticateJWT,
  multerConfig.single('avatar'),
  uploadAvatar
);

export default router;
