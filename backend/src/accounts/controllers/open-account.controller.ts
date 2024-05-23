import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { CurrentUser } from "@/decorators/current-user.decorator";
import { AccountsService } from "../services/accounts.service";
import { z } from "zod";
import { ZodValidationPipe } from "@/pipes/zod-validation.pipe";
import { OpenAccountServicePayload } from "../dtos/open-account.payload";
import { UserContext } from "@/auth/jwt.strategy";

const openAccountBodySchema = z.object({
  accountName: z.string()
});

type OpenAccountBodySchema = z.infer<typeof openAccountBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(openAccountBodySchema);

@Controller("/accounts/open")
@UseGuards(JwtAuthGuard)
export class OpenAccountController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  public async handle(
    @Body(bodyValidationPipe) body: OpenAccountBodySchema,
    @CurrentUser() context: UserContext
  ): Promise<string> {
    //
    const payload: OpenAccountServicePayload = {
      name: body.accountName,
      userId: context.sub
    };

    const accountId = this.accountsService.openAccount(payload);

    return accountId;
  }
}
