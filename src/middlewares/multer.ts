import multer from 'multer';
import path from 'path';

const allowImageExtensions = ['.jpg', '.jpeg', '.png'];

export const imageUploadMulter = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (!allowImageExtensions.includes(ext)) {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});
