import { StatusCodes } from "http-status-codes";

export interface ErrorObj {
  status: StatusCodes;
  message: string;
  context?: unknown;
}

export class BaseError extends Error {
  public status: StatusCodes = 500;
  constructor(status: StatusCodes, message: string) {
    super(message);
    this.status = status;
  }

  public toJSON(context?: unknown): ErrorObj {
    return {
      status: this.status,
      message: this.message,
      context: context,
    }
  }

  static construct(status: StatusCodes, message?: string): ErrorObj {
    return {
      status: status,
      message: message ?? "internal server error",
    }
  }
}

