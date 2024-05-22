import { z } from "zod";

export const envSchema = z.object({
  APP_ENVIRONMENT: z.string().optional().default("DEVELOPMENT"),
  PORT: z.coerce.number().optional().default(3000),
  JWT_SECRET: z.string().optional().default("nest-knex-atm")
});

export type EnvSchema = z.infer<typeof envSchema>;
