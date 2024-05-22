import { BadRequestException, Injectable, Scope } from "@nestjs/common";
import { OpenAccountServicePayload } from "../dtos/open-account.payload";
import { InjectConnection, Knex } from "nestjs-knex";
import { randomUUID } from "node:crypto";
import { GetAllServicePayload } from "../dtos/get-all.payload";
import { Account } from "../dtos/account";

@Injectable({ scope: Scope.REQUEST })
export class AccountsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  public async openAccount({
    name,
    userId
  }: OpenAccountServicePayload): Promise<string> {
    const newAccountId = randomUUID();
    try {
      const account = await this.knex("accounts")
        .where({
          userId,
          name
        })
        .first();

      if (!!account) {
        throw new BadRequestException("Account already exists");
      }

      await this.knex("accounts").insert({
        id: newAccountId,
        userId,
        name
      });
    } catch (error) {
      console.log(error);
      throw error;
    }

    return newAccountId;
  }

  public async getAll(payload: GetAllServicePayload): Promise<Account[]> {
    const accounts: Account[] = await this.knex<Account>("accounts")
      .where({
        userId: payload.userId
      })
      .select("*");

    return accounts;
  }
}
