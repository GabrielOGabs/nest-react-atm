import { Module } from "@nestjs/common";
import { GetAccountsController } from "./controllers/get-accounts.controller";
import { OpenAccountController } from "./controllers/open-account.controller";
import { AccountsService } from "./services/accounts.service";
import { GetAllTransactionsController } from "./controllers/get-all-transaction.controller";
import { DepositController } from "./controllers/deposit.controller";

@Module({
  imports: [],
  controllers: [
    GetAccountsController,
    OpenAccountController,
    GetAllTransactionsController,
    DepositController
  ],
  providers: [AccountsService]
})
export class AccountsModule {}
