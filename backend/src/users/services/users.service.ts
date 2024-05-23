import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nestjs-knex";
import { CreateUserServicePayload } from "../dtos/create-user.payload";
import { FindByLoginServicePayload } from "../dtos/find-by-login.payload";
import { User } from "src/entities/user.entity";
import { randomUUID } from "node:crypto";

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  public async createUser({
    name,
    login,
    pin
  }: CreateUserServicePayload): Promise<boolean> {
    const newAccountId = randomUUID();

    try {
      await this.knex("users").insert({
        id: newAccountId,
        name,
        login,
        pin
      });
    } catch (error) {
      return false;
    }

    return true;
  }

  public async findBylogin(
    payload: FindByLoginServicePayload
  ): Promise<User | null> {
    const user = await this.knex<User>("users")
      .select()
      .where("login", payload.login)
      .first();

    if (user) {
      return user;
    } else {
      return null;
    }
  }

  public onModuleInit() {
    console.log("Init Knex");
  }

  public onModuleDestroy() {
    console.log("Destroy Knex");
    this.knex.destroy();
  }
}
