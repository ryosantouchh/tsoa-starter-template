import { inject, injectable } from "tsyringe";

import { TOKENS } from "@shared/token";
import { StorageService } from "core/service/external";

export interface GetMediaUrlByIdQueryResponse {
  url: string;
  key: string;
  expiresAt: Date | string;
}

@injectable()
export class GetMediaUrlByIdQuery {
  constructor(
    @inject(TOKENS.StorageService) private storageService: StorageService
  ) {}

  async exec(_: number): Promise<GetMediaUrlByIdQueryResponse> {
    try {
      // NOTE: query media table here for file path as a key
      return await this.storageService.getPresignedDownloadUrl("my-folder/mybulba.jpg");
    } catch (error) {
      throw error;
    }
  }
}
