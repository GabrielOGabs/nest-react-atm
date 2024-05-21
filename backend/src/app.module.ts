import { Module } from "@nestjs/common";
import { KnexConnectionModule } from "./knex-connection/knex-connection.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    KnexConnectionModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
