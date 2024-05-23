import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { CurrentUser } from "@/decorators/current-user.decorator";
import { AccountsService } from "../services/accounts.service";
import { z } from "zod";
import { ZodValidationPipe } from "@/pipes/zod-validation.pipe";
import { UserContext } from "@/auth/jwt.strategy";
import { DepositServicePayload } from "../dtos/add-transaction.payload";

const depositBodySchema = z.object({
  amount: z.number().int()
});

type DepositBodySchema = z.infer<typeof depositBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(depositBodySchema);

@Controller("/accounts/:accountId/deposit")
@UseGuards(JwtAuthGuard)
export class DepositController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  public async handle(
    @Body(bodyValidationPipe) body: DepositBodySchema,
    @CurrentUser() context: UserContext,
    @Param("accountId") accountId: string
  ): Promise<string> {
    //
    const payload: DepositServicePayload = {
      accountId,
      amount: body.amount
    };

    const transaction = await this.accountsService.deposit(payload);

    return transaction;
  }
}
