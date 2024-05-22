import { Module } from "@nestjs/common";
import { AccountBallanceController } from "./controllers/ballance.controller";

@Module({
  imports: [],
  controllers: [AccountBallanceController],
  providers: []
})
export class AccountsModule {}
