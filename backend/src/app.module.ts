import { Module } from "@nestjs/common";
import { KnexConnectionModule } from "./knex-connection/knex-connection.module";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { envSchema } from "./env";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true
    }),
    KnexConnectionModule,
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
