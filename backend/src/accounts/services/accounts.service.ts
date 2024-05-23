import {
  BadRequestException,
  Injectable,
  Scope,
  UnauthorizedException
} from "@nestjs/common";
import { OpenAccountServicePayload } from "../dtos/open-account.payload";
import { InjectConnection, Knex } from "nestjs-knex";
import { randomUUID } from "node:crypto";
import { GetAllServicePayload } from "../dtos/get-all.payload";
import { Account } from "../dtos/account";
import { GetAllTransactionsServicePayload } from "../dtos/get-all-transactions.payload";
import { Transaction } from "../dtos/transaction";
import {
  AddTransactionServicePayload,
  DepositServicePayload,
  WithdrawServicePayload
} from "../dtos/add-transaction.payload";

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

  public async getAllTransactions(
    payload: GetAllTransactionsServicePayload
  ): Promise<Transaction[]> {
    const transactions: Transaction[] = await this.knex<Transaction>(
      "transactions"
    )
      .join("accounts", "transactions.accountId", "accounts.id")
      .where({
        "transactions.accountId": payload.accountId,
        "accounts.userId": payload.userId
      })
      .select("transactions.*")
      .orderBy("transactionDate", "desc");

    return transactions;
  }

  public async withdraw(payload: WithdrawServicePayload): Promise<string> {
    const hasFunds: boolean = await this.knex("accounts")
      .where("id", payload.accountId)
      .andWhere("balance", ">=", payload.amount)
      .select("balance")
      .first();

    if (!!hasFunds) {
      return await this.addTransaction({ ...payload, type: "Withdraw" });
    }

    throw new UnauthorizedException("Not enough funds");
  }

  public async deposit(payload: DepositServicePayload): Promise<string> {
    return await this.addTransaction({ ...payload, type: "Deposit" });
  }

  private async addTransaction(
    payload: AddTransactionServicePayload
  ): Promise<string> {
    const newTransactionId = randomUUID();

    try {
      await this.knex("transactions").insert({
        id: newTransactionId,
        accountId: payload.accountId,
        amount: payload.amount,
        type: payload.type
      });

      switch (payload.type) {
        case "Deposit":
          await this.knex("accounts")
            .where("id", payload.accountId)
            .increment("balance", payload.amount);
          break;

        case "Withdraw":
          await this.knex("accounts")
            .where("id", payload.accountId)
            .decrement("balance", payload.amount);
          break;

        default:
          throw new BadRequestException("Invalid transaction type");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }

    return newTransactionId;
  }
}
