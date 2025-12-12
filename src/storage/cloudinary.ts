import cloudinary from '../lib/cloudinary';
import path from 'path';
import fs from 'fs/promises';
import { StorageProvider, UploadResult } from '../interfaces/storage';

export class CloudinaryStorage implements StorageProvider {
  async uploadFile(file: Express.Multer.File): Promise<UploadResult> {
    const filepath = path.resolve(file.path);
    const result = await cloudinary.uploader.upload(filepath, {
      folder: 'images',
    });
    await fs.unlink(filepath);
    return { url: result.secure_url, key: result.public_id };
  }

  async deleteFile(key: string): Promise<void> {
    await cloudinary.uploader.destroy(key);
  }
}

const cloudinaryStorage = new CloudinaryStorage();
export default cloudinaryStorage;
