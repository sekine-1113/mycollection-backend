export interface UploadResult {
  url: string;
  key?: string;
}

export interface StorageProvider {
  uploadFile(file: Express.Multer.File): Promise<UploadResult>;
  deleteFile(key: string): Promise<void>;
}
