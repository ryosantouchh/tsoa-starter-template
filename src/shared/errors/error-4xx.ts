import { StatusCodes } from "http-status-codes";
import { BaseError } from "./common";

export class NotFoundException extends BaseError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
    this.name = 'NotFoundException';
  }
}
