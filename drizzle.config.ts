import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

if (!process.env.DATABASE_CONNECTION_URL || undefined) {
  throw new Error('DATABASE_CONNECTION_URL is missing');
}

export default {
  schema: './src/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env['DATABASE_CONNECTION_URL'],
  }
} satisfies Config;