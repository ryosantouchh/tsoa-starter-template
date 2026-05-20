import {
  Controller,
  Route,
  Post,
  UploadedFile,
  Consumes,
  FormField,
  Get,
  Path,
} from "tsoa";
import { inject, injectable } from "tsyringe";

import { UploadSingleMediaCommand } from "@domain/media/command/upload-single-media";
import { GetMediaUrlByIdQuery, GetMediaUrlByIdQueryResponse } from "@domain/media/query";

@injectable()
@Route("media")
export class MediaController extends Controller {
  constructor(
    @inject(UploadSingleMediaCommand) private uploadSingleMediaCommand: UploadSingleMediaCommand,
    @inject(GetMediaUrlByIdQuery) private getMediaUrlByIdQuery: GetMediaUrlByIdQuery,
  ) {
    super()
  }

  @Post("upload")
  @Consumes("multipart/form-data")
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @FormField() key: string,
  ): Promise<unknown> {
    const payload = {
      key,
      body: file.buffer,
    };

    return this.uploadSingleMediaCommand.exec(
      payload
      // key,
      // file.buffer,
      // { contentType: file.mimetype },
      // bucket
    );
  }

  @Get(":id/url")
  async getPresignedUrlById(
    @Path() id: number,
  ): Promise<GetMediaUrlByIdQueryResponse> {
    return this.getMediaUrlByIdQuery.exec(id);
  }
}
