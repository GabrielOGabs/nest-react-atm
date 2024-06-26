import { Module } from "@nestjs/common";
import { KnexConnectionModule } from "./knex-connection/knex-connection.module";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { envSchema } from "./env";
import { AuthModule } from "./auth/auth.module";
import { AccountsModule } from "./accounts/accounts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true
    }),
    KnexConnectionModule,
    UsersModule,
    AuthModule,
    AccountsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
