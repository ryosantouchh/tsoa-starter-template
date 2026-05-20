import { Readable } from "stream";
import { inject, injectable } from "tsyringe";

import { TOKENS } from "@shared/token";
import { StorageService } from "core/service/external";

export interface UploadSingleMediaCommandRequest {
  key: string,
  body: Buffer | string | Readable,
}

@injectable()
export class UploadSingleMediaCommand {
  constructor(
    @inject(TOKENS.StorageService) private storageService: StorageService
  ) {}

  async exec(body: UploadSingleMediaCommandRequest) {
    try {
      await this.storageService.upload(body)
    } catch (error) {
      throw error;
    }
  }
}
