import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nestjs-knex";
import { CreateUserServicePayload } from "../dtos/createUser.servicePayload";
import { FindByLoginServicePayload } from "../dtos/findByLogin.servicePayload";
import { User } from "src/entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  public async createUser({
    name,
    login,
    pin
  }: CreateUserServicePayload): Promise<boolean> {
    console.log(`${name} ${login} ${pin}`);

    try {
      await this.knex("users").insert({
        id: "2cb3cfb4-908a-43fb-83cc-11baed15c77d",
        name,
        login,
        pin
      });

      console.log("User inserted successfully");
    } catch (error) {
      return false;
    } finally {
      await this.knex.destroy();
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
}
