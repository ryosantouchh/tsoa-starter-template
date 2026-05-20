export type StorageServiceUploadResult = {
  key: string;
  bucket: string;
  etag: string;
  location: string;
  sizeBytes: number;
}

export type StorageServiceGetPresignedUrl = {
  url: string;
  key: string;
  expiresAt: Date | string;
}
