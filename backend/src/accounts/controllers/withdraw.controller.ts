import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { CurrentUser } from "@/decorators/current-user.decorator";
import { AccountsService } from "../services/accounts.service";
import { z } from "zod";
import { ZodValidationPipe } from "@/pipes/zod-validation.pipe";
import { UserContext } from "@/auth/jwt.strategy";
import { WithdrawServicePayload } from "../dtos/add-transaction.payload";

const withdrawBodySchema = z.object({
  amount: z.number().int()
});

type WithdrawBodySchema = z.infer<typeof withdrawBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(withdrawBodySchema);

@Controller("/accounts/:accountId/withdraw")
@UseGuards(JwtAuthGuard)
export class WithdrawController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  public async handle(
    @Body(bodyValidationPipe) body: WithdrawBodySchema,
    @CurrentUser() context: UserContext,
    @Param("accountId") accountId: string
  ): Promise<string> {
    //
    const payload: WithdrawServicePayload = {
      accountId,
      amount: body.amount
    };

    const transactionId = await this.accountsService.withdraw(payload);

    return transactionId;
  }
}
