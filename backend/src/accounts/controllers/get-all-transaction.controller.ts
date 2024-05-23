import { AccountsService } from "./../services/accounts.service";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserContext } from "src/auth/jwt.strategy";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { GetTransactionResponse } from "../responses/get-transaction.response";
import { GetAllTransactionsServicePayload } from "../dtos/get-all-transactions.payload";
import { Transaction } from "../dtos/transaction";

@Controller("/accounts/:accountId/transactions")
@UseGuards(JwtAuthGuard)
export class GetAllTransactionsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  public async handle(
    @CurrentUser() context: UserContext,
    @Param("accountId") accountId: string
  ): Promise<GetTransactionResponse[]> {
    const payload: GetAllTransactionsServicePayload = {
      userId: context.sub,
      accountId
    };

    const transactions: Transaction[] =
      await this.accountsService.getAllTransactions(payload);

    const result = transactions.map((transaction) => {
      const transactionResponse: GetTransactionResponse = {
        id: transaction.id,
        amount: transaction.amount,
        type: transaction.type,
        transactionDate: transaction.transactionDate
      };

      return transactionResponse;
    });

    return result;
  }
}
