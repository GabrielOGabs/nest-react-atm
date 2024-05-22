import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nestjs-knex";
import { createUserServicePayload } from "../dtos/createUser.servicePayload";

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  public async createUser({
    name,
    login,
    pin
  }: createUserServicePayload): Promise<boolean> {
    console.log(`${name} ${login} ${pin}`);

    try {
      await this.knex("users").insert({
        id: "",
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
}
