import { StatusCodes } from "http-status-codes";
import { BaseError } from "./common";

// actually we don't need this
export class InternalServerException extends BaseError {
  constructor(message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    this.name = 'InternalServerException';
  }
}
