import { Module } from "@nestjs/common";
import knexConfig from "knexfile";
import { KnexModule } from "nestjs-knex";
import { KnexTestService } from "./services/knex-test.service";
import { KnexController } from "./controllers/knex.controller";
import { ConfigService } from "@nestjs/config";
import { EnvSchema } from "src/env";

@Module({
  imports: [
    KnexModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvSchema, true>) => ({
        config: knexConfig[config.get<string>("APP_ENVIRONMENT")]
      })
    })
  ],
  providers: [KnexTestService],
  controllers: [KnexController],
  exports: [KnexTestService]
})
export class KnexConnectionModule {}
