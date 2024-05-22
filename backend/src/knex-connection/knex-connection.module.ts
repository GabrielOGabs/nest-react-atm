import { Module } from "@nestjs/common";
import knexConfig from "knexfile";
import { KnexModule } from "nestjs-knex";
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
  ]
})
export class KnexConnectionModule {}
