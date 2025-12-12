import { StorageProvider, UploadResult } from '../interfaces/storage';

export class S3Storage implements StorageProvider {
  async uploadFile(file: Express.Multer.File): Promise<UploadResult> {
    console.warn('not implemented');
    return { url: '', key: '' };
  }

  async deleteFile(key: string): Promise<void> {
    new Promise(() => console.warn('not implemented'));
  }
}
