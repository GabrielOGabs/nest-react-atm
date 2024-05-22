import { Module } from "@nestjs/common";
import { GetAccountsController } from "./controllers/get-accounts.controller";
import { OpenAccountController } from "./controllers/open-account.controller";
import { AccountsService } from "./services/accounts.service";

@Module({
  imports: [],
  controllers: [GetAccountsController, OpenAccountController],
  providers: [AccountsService]
})
export class AccountsModule {}
