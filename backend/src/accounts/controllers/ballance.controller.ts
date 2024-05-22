import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/accounts/{id}/ballance")
@UseGuards(AuthGuard("jwt"))
export class AccountBallanceController {
  constructor() {}

  @Get()
  public async handle(): Promise<any> {}
}
