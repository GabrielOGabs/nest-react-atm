import { FindByLoginServicePayload } from "./../../users/dtos/findByLogin.servicePayload";
import { UsersService } from "./../../users/services/users.service";
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes
} from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { JwtService } from "@nestjs/jwt";
import { AuthorizeResponse } from "../responses/authorize.response";
import { UserContext } from "../jwt.strategy";

const authorizeBodySchema = z.object({
  login: z.string().email(),
  pin: z.string()
});

type AuthenticateBodySchema = z.infer<typeof authorizeBodySchema>;

@Controller("/auth/authorize")
export class AuthenticateController {
  constructor(
    private readonly jwt: JwtService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authorizeBodySchema))
  public async handle(
    @Body() body: AuthenticateBodySchema
  ): Promise<AuthorizeResponse> {
    const payload: FindByLoginServicePayload = {
      login: body.login
    };

    const user = await this.usersService.findBylogin(payload);

    if (user.pin !== body.pin) {
      throw new UnauthorizedException("Invalid credentials!");
    }

    const userContext: UserContext = {
      sub: user.id,
      name: user.name,
      login: user.login
    };

    const token = this.jwt.sign(userContext);

    const response: AuthorizeResponse = {
      access_token: token
    };

    return response;
  }
}
