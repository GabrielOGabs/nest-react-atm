import { EnvSchema } from "src/env";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { UsersService } from "src/users/services/users.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./services/auth.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService<EnvSchema, true>) => {
        const privateKey = config.get("JWT_PRIVATE_KEY", { infer: true });
        const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });

        return {
          signOptions: { algorithm: "RS256" },
          privateKey: Buffer.from(privateKey, "base64"),
          publicKey: Buffer.from(publicKey, "base64")
        };
      }
    })
  ],
  controllers: [AuthenticateController],
  providers: [UsersService, AuthService, JwtStrategy]
})
export class AuthModule {}
