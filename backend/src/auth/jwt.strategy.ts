import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvSchema } from "@/env";
import { z } from "zod";

const userContextSchema = z.object({
  sub: z.string().uuid(),
  loggedUser: z.object({
    name: z.string(),
    login: z.string()
  })
});

export type UserContext = z.infer<typeof userContextSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<EnvSchema, true>) {
    const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"]
    });
  }

  public async validate(payload: UserContext) {
    return userContextSchema.parse(payload);
  }
}
