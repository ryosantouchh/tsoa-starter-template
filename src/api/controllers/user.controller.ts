import type { TsoaResponse } from "tsoa"

import { StatusCodes } from "http-status-codes";
import {
  Controller,
  Get,
  Route,
  Res,
} from "tsoa";

@Route("users")
export class UsersController extends Controller {
  constructor() {
    super()
  }

  @Get("{userId}")
  public async getUser(
    @Res() res: TsoaResponse<StatusCodes.OK, string>
  ): Promise<string> {
    return res(200, "test");
  }
}
