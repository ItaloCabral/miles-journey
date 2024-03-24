import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.string().default('development'),
  APP_URL: z.string().default('http://127.0.0.1'),
})

export type Env = z.infer<typeof envSchema>

export const env: Env = envSchema.parse(process.env)
