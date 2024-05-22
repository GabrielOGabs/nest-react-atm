import { Module } from "@nestjs/common";
import { CreateUserController } from "./controllers/create-user.controller";
import { UsersService } from "./services/users.service";

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [UsersService]
})
export class UsersModule {}
