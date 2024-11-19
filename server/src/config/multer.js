import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { BadRequestError } from '../utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    if (req.url === '/upload-avatar') {
      cb(null, `${Date.now()}-avatar-${file.originalname}`);
    } else {
      cb(null, `${Date.now()}-post-${file.originalname}`);
    }
  },
});

const multerConfig = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb(
        new BadRequestError('Only .png, .jpg, and .jpeg files are allowed!'),
        false
      );
    }
  },
});

export default multerConfig;
