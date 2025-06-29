import { Router } from 'express';
import app from './app';
import cloudinary from './lib/cloudinary';
import path from 'path';
import fs from 'fs/promises';
import { imageUploadMulter } from './middlewares/multer';
import config from './config';

const imageRouter = Router();
imageRouter.post('/', imageUploadMulter.single('image'), async (req, res) => {
  if (!req.file) {
    console.error('file none');
    throw new Error();
  }
  const filepath = path.resolve(req.file.path);
  const result = await cloudinary.uploader.upload(filepath, {
    folder: 'images',
  });
  await fs.unlink(filepath);
  res.status(200).json(result);
});
app.use('/images', imageRouter);

const port = config.PORT;
app.listen(port, () => {
  console.log(`Server on ${port}`);
  if (process.env.NODE_ENV === 'develop' || true) {
    console.log(`${config.DOMAIN}:${port}/swagger-ui`);
  }
});
