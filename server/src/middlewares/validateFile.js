import { ValidationError } from '../utils/error';

const validateFile = (req, res, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb(
      new ValidationError('Only .png, .jpg, and .jpeg files are allowed!'),
      false
    );
  }
};

export default validateFile;
