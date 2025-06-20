import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  JWT_TOKEN_EXPIRES_IN: z.coerce.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z.coerce.string(),
  OPENAI_API_KEY: z.coerce.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables');
}

export const env = _env.data;