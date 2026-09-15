import * as z from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z
    .string({ message: 'is required' })
    .regex(
      /^postgres(ql)?:\/\/\S+$/,
      'must be a postgres:// or postgresql:// connection URL',
    ),
  AUTH_SECRET: z
    .string({ message: 'is required' })
    .min(
      32,
      'must be at least 32 characters; generate one with `npx auth secret`',
    ),
});

export type Env = z.infer<typeof EnvSchema>;

// Throws one error naming every missing or malformed variable.
export function parseEnv(
  source: Record<string, string | undefined> = process.env,
): Env {
  const result = EnvSchema.safeParse(source);

  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `  ${issue.path.join('.')} ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${problems}`);
  }

  return result.data;
}
