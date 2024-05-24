import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { EnvSchema } from "./env";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get<ConfigService<EnvSchema, true>>(ConfigService);

  const port = configService.get("PORT", { infer: true });

  await app.listen(port);
}
bootstrap();
