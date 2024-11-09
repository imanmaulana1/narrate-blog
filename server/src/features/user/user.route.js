import { Router } from 'express';

import {
  updateUserPassword,
  updateUserDetails,
  getDetailUser,
  updateUserAvatar,
} from './user.controller.js';
import { authenticateJWT } from '../../middlewares/verifyToken.js';
import {
  validateChangePassword,
  validateUpdateProfile,
} from '../../middlewares/validateInput.js';
import multerConfig from '../../config/multer.js';

const router = Router();

router.get('/:username', getDetailUser);
router.patch(
  '/profile',
  authenticateJWT,
  validateUpdateProfile,
  updateUserDetails
);
router.patch(
  '/change-password',
  authenticateJWT,
  validateChangePassword,
  updateUserPassword
);
router.patch(
  '/upload-avatar',
  authenticateJWT,
  multerConfig.single('avatar'),
  updateUserAvatar
);

export default router;
