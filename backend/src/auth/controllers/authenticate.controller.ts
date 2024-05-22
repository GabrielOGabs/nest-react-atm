import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";
import { AuthorizeResponse } from "../responses/authorize.response";
import { AuthService } from "../services/auth.service";
import { AuthenticateUserServicePayload } from "../dtos/authenticateUser.servicePayload";

const authorizeBodySchema = z.object({
  login: z.string().email(),
  pin: z.string()
});

type AuthenticateBodySchema = z.infer<typeof authorizeBodySchema>;

@Controller("/auth/authorize")
export class AuthenticateController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authorizeBodySchema))
  public async handle(
    @Body() body: AuthenticateBodySchema
  ): Promise<AuthorizeResponse> {
    //
    const payload: AuthenticateUserServicePayload = {
      login: body.login,
      pin: body.pin
    };

    const token = await this.authService.authenticateUser(payload);

    const response: AuthorizeResponse = {
      access_token: token
    };

    return response;
  }
}
