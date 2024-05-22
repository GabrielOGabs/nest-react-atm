import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserContext } from "src/auth/jwt.strategy";
import { CurrentUser } from "src/decorators/current-user.decorator";

@Controller("/accounts/ballance")
@UseGuards(JwtAuthGuard)
export class AccountBallanceController {
  constructor() {}

  @Get()
  public async handle(@CurrentUser() context: UserContext): Promise<any> {
    console.log(context);

    return "ok";
  }
}
