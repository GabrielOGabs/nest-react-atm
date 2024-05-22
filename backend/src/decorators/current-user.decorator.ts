import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserContext } from "src/auth/jwt.strategy";

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as UserContext;
  }
);