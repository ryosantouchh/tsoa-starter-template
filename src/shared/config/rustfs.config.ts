import { S3Client } from "@aws-sdk/client-s3";
import { requireEnv } from "@shared/utils";

export const RUSTFS_BUCKET = requireEnv("S3_BUCKET");

export const rustfsClient = new S3Client({
  endpoint: requireEnv("S3_ENDPOINT"),
  region: process.env.RUSTFS_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: requireEnv("S3_ACCESS_KEY"),
    secretAccessKey: requireEnv("S3_SECRET_KEY"),
  },
  forcePathStyle: true,
});

export const rustfsPresignClient = new S3Client({
  endpoint: requireEnv("S3_ENDPOINT_EXTERNAL"),
  region: process.env.RUSTFS_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: requireEnv("S3_ACCESS_KEY"),
    secretAccessKey: requireEnv("S3_SECRET_KEY"),
  },
  forcePathStyle: true,
});
