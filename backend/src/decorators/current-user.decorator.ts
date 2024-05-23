import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserContext } from "@/auth/jwt.strategy";

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext): UserContext => {
    const request = context.switchToHttp().getRequest();

    return request.user as UserContext;
  }
);
