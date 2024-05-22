import { z } from "zod";

export const envSchema = z.object({
  APP_ENVIRONMENT: z.string().optional().default("DEVELOPMENT"),
  PORT: z.coerce.number().optional().default(3000),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string()
});

export type EnvSchema = z.infer<typeof envSchema>;
