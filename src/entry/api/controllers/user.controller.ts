import type { TsoaResponse } from "tsoa"

import { StatusCodes } from "http-status-codes";
import {
  Controller,
  Get,
  Route,
  Res,
  Path,
} from "tsoa";
import { inject, injectable } from "tsyringe";
import { GetUserByIdQuery } from "@domain/user/query";
import { NotFoundException } from "@shared/errors";
import { BaseError } from "@shared/errors/common";

@injectable()
@Route("users")
export class UsersController extends Controller {
  constructor(
    @inject(GetUserByIdQuery) private getUserByIdQuery: GetUserByIdQuery,
  ) {
    super()
  }

  @Get("{userId}")
  public async getUserById(
    @Res() res: TsoaResponse<StatusCodes.OK, any>,
    @Res() res404: TsoaResponse<StatusCodes.NOT_FOUND, any>,
    @Res() res500: TsoaResponse<StatusCodes.INTERNAL_SERVER_ERROR, any>,
    @Path() userId: string,
  ): Promise<any> {
    try {
      return res(200, await this.getUserByIdQuery.exec(userId));
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res404(404, error.toJSON());
      }

      return res500(500, BaseError.construct(StatusCodes.INTERNAL_SERVER_ERROR));
    }
  }
}
