import type { Insertable, Selectable, Updateable } from "kysely";
import type { Users } from "@infra/database/types";
import { db } from "@infra/database/kysely";
import { singleton } from "tsyringe";

// ---------- interface ----------
export interface IUserRepository {
  findById: (id: string) => Promise<User | null>;
}

// ---------- instance ----------
@singleton()
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const userById = await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    if (!userById) {
      return null;
    }

    return userById;
  }

  // async findByEmail(email: string): Promise<User | undefined> {
  //   return db
  //     .selectFrom("users")
  //     .selectAll()
  //     .where("email", "=", email)
  //     .executeTakeFirst();
  // }
  //
  // async findAll(): Promise<User[]> {
  //   return db
  //     .selectFrom("users")
  //     .selectAll()
  //     .execute();
  // }
  //
  // async create(data: NewUser): Promise<User> {
  //   return db
  //     .insertInto("users")
  //     .values(data)
  //     .returningAll()
  //     .executeTakeFirstOrThrow();
  // }
  //
  // async update(id: string, data: UserUpdate): Promise<User | undefined> {
  //   return db
  //     .updateTable("users")
  //     .set(data)
  //     .where("id", "=", id)
  //     .returningAll()
  //     .executeTakeFirst();
  // }
  //
  // async delete(id: string): Promise<void> {
  //   await db
  //     .deleteFrom("users")
  //     .where("id", "=", id)
  //     .execute();
  // }
}

// ---------- types ----------
export type User = Selectable<Users>;
export type NewUser = Insertable<Users>;
export type UserUpdate = Updateable<Users>;

