import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { FindByLoginServicePayload } from "src/users/dtos/find-by-login.payload";
import { UsersService } from "src/users/services/users.service";
import { UserContext } from "../jwt.strategy";
import { AuthenticateUserServicePayload } from "../dtos/authenticate-user.payload";
import { Knex } from "knex";
import { InjectConnection } from "nestjs-knex";

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly jwt: JwtService,
    private readonly usersService: UsersService
  ) {}

  public async authenticateUser({
    login,
    pin
  }: AuthenticateUserServicePayload): Promise<string> {
    const payload: FindByLoginServicePayload = {
      login
    };

    const user = await this.usersService.findBylogin(payload);

    if (user.pin !== pin) {
      throw new UnauthorizedException("Invalid credentials!");
    }

    const userContext: UserContext = {
      sub: user.id,
      loggedUser: {
        name: user.name,
        login: user.login
      }
    };

    const token = this.jwt.sign(userContext);

    return token;
  }
}
