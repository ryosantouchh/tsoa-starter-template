import type { IUserRepository } from "@repositories/user.repo";

import { inject, injectable } from "tsyringe";
import { TOKENS } from "@shared/token";
import { NotFoundException } from "@shared/errors";

@injectable()
export class GetUserByIdQuery {
  constructor(
    @inject(TOKENS.UserRepository) private userRepo: IUserRepository
  ) {}

  async exec(id: string) {
    try {
      const userById = await this.userRepo.findById(id);

      if (!userById) {
        throw new NotFoundException("user is not found");
      }

      return userById;
    } catch (error) {
      throw error;
    }
  }
}
