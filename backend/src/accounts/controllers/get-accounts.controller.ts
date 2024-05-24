import { GetAccountResponse } from "./../responses/get-account.response";
import { AccountsService } from "./../services/accounts.service";
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { UserContext } from "@/auth/jwt.strategy";
import { CurrentUser } from "@/decorators/current-user.decorator";
import { GetAllServicePayload } from "../dtos/get-all.payload";

@Controller("/accounts")
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class GetAccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  public async handle(
    @CurrentUser() context: UserContext
  ): Promise<GetAccountResponse[]> {
    const payload: GetAllServicePayload = {
      userId: context.sub
    };

    const accounts = await this.accountsService.getAll(payload);

    const result = accounts.map((account) => {
      const accountResponse: GetAccountResponse = {
        id: account.id,
        name: account.name,
        balance: Number(account.balance)
      };

      return accountResponse;
    });

    return result;
  }
}
