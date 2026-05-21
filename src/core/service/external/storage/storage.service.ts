import { Readable } from "stream";
import { singleton } from "tsyringe";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import { RUSTFS_BUCKET, rustfsClient, rustfsPresignClient } from "@shared/config";
import { StorageServiceGetPresignedUrl, StorageServiceUploadResult } from "./storage.types";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@singleton()
export class StorageService {
  private client = rustfsClient;
  private presignedClient = rustfsPresignClient;
  private defaultBucket = RUSTFS_BUCKET;

  async upload({
    key,
    body,
  }: {
    key: string,
    body: Buffer | string | Readable,
    // options: UploadOptions = {},
  }): Promise<StorageServiceUploadResult> {
    const bodyBuffer =
      body instanceof Readable ? await this.streamToBuffer(body) : body;

    const sizeBytes =
      typeof bodyBuffer === "string"
        ? Buffer.byteLength(bodyBuffer)
        : (bodyBuffer as Buffer).byteLength;

    const res = await this.client.send(
      new PutObjectCommand({
        Bucket: this.defaultBucket,
        Key: key,
        Body: bodyBuffer,
        // ContentType: options.contentType ?? "application/octet-stream",
        // Metadata: options.metadata,
        // ServerSideEncryption: options.serverSideEncryption as any,
      })
    );

    return {
      key,
      bucket: this.defaultBucket,
      etag: res.ETag?.replace(/"/g, "") ?? "",
      location: `${process.env.RUSTFS_ENDPOINT}/${this.defaultBucket}/${key}`,
      sizeBytes,
    };
  }

  async getPresignedDownloadUrl(
    key: string,
    // options: PresignOptions = {},
  ): Promise<StorageServiceGetPresignedUrl> {
    // const expiresIn = options.expiresInSeconds ?? 3600;
    const expiresIn = 3600;
    const command = new GetObjectCommand({ Bucket: this.defaultBucket, Key: key });
    const url = await getSignedUrl(this.presignedClient, command, { expiresIn });
    return {
      url,
      key,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
    };
  }

  private streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
      stream.on("error", reject);
    });
  }
}

