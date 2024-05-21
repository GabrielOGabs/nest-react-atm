import { Module } from "@nestjs/common";
import knexConfig from "knexfile";
import { KnexModule } from "nestjs-knex";
import { KnexTestService } from "./services/knex-test.service";
import { KnexController } from "./controllers/knex.controller";

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: knexConfig[process.env.ENVIRONMENT]
      })
    })
  ],
  providers: [KnexTestService],
  controllers: [KnexController],
  exports: [KnexTestService]
})
export class KnexConnectionModule {}
